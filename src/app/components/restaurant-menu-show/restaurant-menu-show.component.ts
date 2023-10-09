import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { restaurantModel } from 'src/app/models/restaurantModel';
import { rest_menuModel } from 'src/app/models/rest_menuModel';
import { rest_urunModel } from 'src/app/models/rest_urunModel';
import { menulerModel } from 'src/app/models/menulerModel';
import { menuModel } from 'src/app/models/menuModel';
import { urunModel } from 'src/app/models/urunModel';

import { ServiceRestaurantService } from 'src/app/services/service-restaurant.service';
import { ServiceRestMenuService } from 'src/app/services/service-rest-menu.service';
import { ServiceRestUrunService } from 'src/app/services/service-rest-urun.service';
import { ServiceMenulerService } from 'src/app/services/service-menuler.service';
import { ServiceMenuService } from 'src/app/services/service-menu.service';
import { ServiceUrunlerService } from 'src/app/services/service-urunler.service';
import { ServiceSepetService } from 'src/app/services/service-sepet.service';

@Component({
  selector: 'app-restaurant-menu-show',
  templateUrl: './restaurant-menu-show.component.html',
  styleUrls: ['./restaurant-menu-show.component.css'],
})
export class RestaurantMenuShowComponent {
  SelectedRestaurantID: any;
  findedRest: restaurantModel | undefined; // findedRest bilgilerini tutacak değişken

  restList: restaurantModel[] = [];
  restmenuList: rest_menuModel[] = [];
  resturunList: rest_urunModel[] = [];
  menulerList: menulerModel[] = [];
  menuList: menuModel[] = [];
  urunList: urunModel[] = [];

  filteredMenuList: any[] = []; //RestaurantMenuMergeList restaurantIDleri ile eşleşen  findedRest restaurantIDleri getir
  filteredUrunList: any[] = [];

  RestaurantMenuMergeList: any[] = []; // list1+list2+list3
  RestaurantUrunMergeList: any[] = [];
  mergeMenulerList: any[] = []; //menulerList+urunList+menuList
  mergeUrunList: any[] = []; //resturunList+urunList

  isButtonDisabled: boolean = false;
  public toplam: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiServiceREST: ServiceRestaurantService,
    private apiServiceRESTMENU: ServiceRestMenuService,
    private apiServiceRESTURUN: ServiceRestUrunService,
    private apiServiceMENULER: ServiceMenulerService,
    private apiServiceMENU: ServiceMenuService,
    private apiServiceURUN: ServiceUrunlerService,
    public apiServiceSEPET: ServiceSepetService
  ) {}

  ngOnInit(): void {
    //ilk önce boş sonra dolu geliyor ya da sayfada dolunca görmek istenilen veriler için

    forkJoin([
      //asekron beraber 3 service i çağrıldı
      this.apiServiceREST.get(),
      this.apiServiceRESTMENU.get(),
      this.apiServiceRESTURUN.get(),
      this.apiServiceMENULER.get(),
      this.apiServiceMENU.get(),
      this.apiServiceURUN.get(),
    ]).subscribe(
      ([rests, restmenus, resturuns, menulers, menus, uruns]) => {
        this.restList = rests;
        this.restmenuList = restmenus;
        this.resturunList = resturuns;
        this.menulerList = menulers;
        this.menuList = menus;
        this.urunList = uruns;

        //methodları buraya çağır
        this.getRestaurantMenuMergeList();
        this.getMerge_Menuler();
        this.getRestaurantID(); //seçilen restaurantı urlden alıyor
        this.filterRestaurantMenu();
        // this.filterRestaurantUrun(); // bu fonksiyonu zaten  this.merge_Resturun_Urun() fonksiyonunda çağırıyorum
        this.merge_Resturun_Urun();
      },
      (error: any) => {
        console.error(error);
      }
    ); //end forkJoin
  } //end ngOnInit

  ngAfterViewInit(): void {
    //direkt dolu geliyor
    this.getRestList();
  }

  async getRestList(): Promise<void> {
    try {
      const response: any = await this.apiServiceREST.get().toPromise();
      this.restList = response;
      // console.log(this.restList);

      this.getRestaurantID(); // Veriyi elde ettikten sonra getRestaurantID() fonksiyonunu çağır
    } catch (error) {
      console.error(error);
    }
  }

  filterRestaurantMenu() {
    // RestaurantMenuMergeList listesini burada filtreleyin
    this.filteredMenuList = this.RestaurantMenuMergeList.filter((item) => {
      // Eşleşen restaurantID'ye sahip öğeleri döndürün
      return item.restaurantID === this.findedRest?.restaurantID;
    });
    console.log('filteredMenuList', this.filteredMenuList);
  }

  filterRestaurantUrun() {
    this.filteredUrunList = this.mergeUrunList.filter((item) => {
      return item.restaurantID === this.findedRest?.restaurantID;
    });
    console.log('filteredUrunList', this.filteredUrunList);
  }

  getRestaurantID() {
    //restaurant-home'dan geldi
    this.route.params.subscribe((params) => {
      this.SelectedRestaurantID = +params['restaurantID']; // "+" ile stringi number'a çeviriyoruz
      // Kategori ID'sini kullanarak yapmanız gereken işlemleri gerçekleştirin
      //console.log("this.SelectedRestaurantID:", this.SelectedRestaurantID);
      this.findedRest = this.restList.find(
        (item) => item.restaurantID === this.SelectedRestaurantID
      );
      //console.log("this.restList: ", this.restList)
      // console.log("this.findedRest: ", this.findedRest)
    });
  }

  getRestaurantMenuMergeList() {
    //rest+restmenu//menuler+menu//menuler+urun 3 liste birleştirildi
    this.RestaurantMenuMergeList = this.restList.map((rest) => {
      const restmenu = this.restmenuList.find(
        (restmenu) => restmenu.restaurantID === rest.restaurantID
      );
      const menu = this.menuList.find(
        (menu) => menu.menuID === restmenu?.menuID
      );
      const menuler = this.menulerList.find(
        (menuler) => menuler.menuID === restmenu?.menuID
      );
      const urun = this.urunList.find(
        (urun) => urun.urunID === menuler?.urunID
      );

      return {
        menuID: restmenu ? restmenu.menuID : null,
        restaurantID: rest.restaurantID,
        restaurantAd: rest.restaurantAd,
        restaurantAdres: rest.restaurantAdres,
        restaurantTel: rest.restaurantTel,
        restaurantImg: rest.restaurantImg,
        restMenuID: restmenu ? restmenu.restMenuID : null,
        menulerID: menuler ? menuler.menulerID : null,
        urunID: urun ? urun.urunID : null,
        menuAdi: menu ? menu.menuAdi : '',
        menuImg: menu ? menu.menuImg : '',
        urunAdi: urun ? urun.urunAdi : '',
        urunFiyat: urun ? urun.urunFiyat : null,
        urunImg: urun ? urun.urunImg : '',
        kategoriID: urun ? urun.kategoriID : null,
      };
    });

    console.log('this.RestaurantMenuMergeList: ', this.RestaurantMenuMergeList);
  }

  getMerge_Menuler() {
    //mergeMenulerList dizi oluşturma işlemi
    this.mergeMenulerList = this.menulerList.map((menuler) => {
      const urun = this.urunList.find((urun) => urun.urunID === menuler.urunID);
      const menu = this.menuList.find((menu) => menu.menuID === menuler.menuID);
      return {
        menulerID: menuler.menulerID,
        urunID: urun ? urun.urunID : null,
        urunAdi: urun ? urun.urunAdi : '', //boş gelirse
        urunImg: urun ? urun.urunImg : '',
        urunFiyat: urun ? urun.urunFiyat : null,
        menuID: menu ? menu.menuID : null,
        menuAdi: menu ? menu.menuAdi : '', //boş gelirse
      };
    });
    // console.log("this.mergeMenulerList: ", this.mergeMenulerList);
  }

  //restaurant ile ürünleri içeren dizi
  //resturunList(restUrunID, restaurantID, urunID)
  //urunList (urunID,urunAdi, urunFiyat, urunImg)
  merge_Resturun_Urun() {
    this.mergeUrunList = this.resturunList.map((resturun) => {
      const urun = this.urunList.find((urun) => urun.urunID == resturun.urunID);
      return {
        restaurantID: resturun.restaurantID,
        urunID: resturun.urunID,
        urunAdi: urun ? urun.urunAdi : '',
        urunFiyat: urun ? urun.urunFiyat : null,
        urunImg: urun ? urun.urunImg : '',
      };
    });
    this.filterRestaurantUrun();
    console.log('this.mergeUrunList', this.mergeUrunList); //urunler ile restaurantlar listesi
  }

  calculateMenuPrice(menuID: number): number {
    let total = 0;
    for (const urun of this.mergeMenulerList) {
      //mergeMenulerList menü ile ürünlerin birleştiği list
      if (urun.menuID === menuID) {
        total += urun.urunFiyat;
      }
    }
    total = total * 0.9; //menüye özel %10 indirim
    return total;
  }

  UrunEkle(item: any) {
    //sepete urun  ekle
    console.log('sepet servicene ürün eklendi');
    //this.isButtonDisabled = true; // Butonu devre dışı bırak
    this.apiServiceSEPET.ekleUrun(item);
  }

  MenuEkle(item: any) {
    //sepete menu nesne şeklinde ekle
    console.log('sepet servicene menü eklendi');
    const urun = {
      menuAdi: item.menuAdi,
      fiyat: this.calculateMenuPrice(item.menuID),
    };
    this.apiServiceSEPET.ekleMenu(urun);
  }

  toplamUrunFiyatlari(): number {
    let toplamUrun = 0;
    const urunler = this.apiServiceSEPET.sepetUrunGetir();

    for (const urun of urunler) {
      toplamUrun += urun.urunFiyat;
    }

    return toplamUrun;
  }

  toplamMenuFiyatlari(): number {
    let toplamMenu = 0;
    const menuler = this.apiServiceSEPET.sepetMenuGetir();

    for (const menu of menuler) {
      toplamMenu += menu.fiyat;
    }

    return toplamMenu;
  }

  TotalFiyat(): number {
    let total = 0;
    return (total = this.toplamUrunFiyatlari() + this.toplamMenuFiyatlari());
  }
}
