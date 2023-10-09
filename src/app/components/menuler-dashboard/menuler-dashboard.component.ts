import { Component, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { menuModel } from 'src/app/models/menuModel';
import { urunModel } from 'src/app/models/urunModel';
import { menulerModel } from 'src/app/models/menulerModel';
import { rest_menuModel } from 'src/app/models/rest_menuModel';
import { restaurantModel } from 'src/app/models/restaurantModel';
import { ServiceUrunlerService } from 'src/app/services/service-urunler.service';
import { ServiceMenuService } from 'src/app/services/service-menu.service';
import { ServiceMenulerService } from 'src/app/services/service-menuler.service';
import { ServiceRestMenuService } from 'src/app/services/service-rest-menu.service';
import { ServiceRestaurantService } from 'src/app/services/service-restaurant.service';
import { MenulerUpdateComponent } from '../menuler-update/menuler-update.component';

@Component({
  selector: 'app-menuler-dashboard',
  templateUrl: './menuler-dashboard.component.html',
  styleUrls: ['./menuler-dashboard.component.css']
})
export class MenulerDashboardComponent {

  @Input() selectedRestaurantID: any; // gelen veriyi almak için 
  //rest-home--->-home'dan restaurantID alındı(htmlden)

  menuList: menuModel[] = [];
  urunList: urunModel[] = [];
  menulerList: menulerModel[] = [];
  mergeMenulerList: any[] = [];

  rest_restmenu_mergeList: any[] = [];
  restList: restaurantModel[] = [];
  restmenuList: rest_menuModel[] = [];

  mergeList: any[] = [];

  constructor(
    private apiServiceURUN: ServiceUrunlerService,
    private apiServiceMENU: ServiceMenuService,
    private apiServiceMENULER: ServiceMenulerService,
    private apiServiceREST: ServiceRestaurantService,
    private apiServiceRESTMENU: ServiceRestMenuService,
  ) { }

  ngOnInit(): void {

    console.log("selectedRestaurantID:", this.selectedRestaurantID);

    forkJoin([ //asekron beraber 3 service i çağrıldı
      this.apiServiceURUN.get(),
      this.apiServiceMENU.get(),
      this.apiServiceMENULER.get(),
      this.apiServiceREST.get(),
      this.apiServiceRESTMENU.get()
    ]).subscribe(
      ([uruns, menus, menulers, rests, restmenus]) => {
        this.urunList = uruns;
        this.menuList = menus;
        this.menulerList = menulers;
        this.restList = rests;
        this.restmenuList = restmenus;

        this.getMerge_Menuler(); // diziyi çağırdım
        this.getMerge_RestMenu(); // diziyi çağırdım
        this.GET_MERGE_LİST();
        // console.log(" this.menuList: ", this.menuList);
        // console.log(" this.urunList: ", this.urunList);
        // console.log(" this.menulerList: ", this.menulerList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  getMerge_Menuler() { //mergeMenulerList dizi oluşturma işlemi 
    this.mergeMenulerList = this.menulerList.map(menuler => {
      const urun = this.urunList.find(urun => urun.urunID === menuler.urunID);
      const menu = this.menuList.find(menu => menu.menuID === menuler.menuID);
      return {
        menulerID: menuler.menulerID,
        urunID: urun ? urun.urunID : null,
        urunAdi: urun ? urun.urunAdi : '', //boş gelirse
        menuID: menu ? menu.menuID : null,
        menuAdi: menu ? menu.menuAdi : ''//boş gelirse
      };

    });
    console.log("this.mergeMenulerList: ", this.mergeMenulerList);
  }

  getMerge_RestMenu() { //rest_restmenu_mergeList dizi oluşturma işlemi 
    this.rest_restmenu_mergeList = this.restmenuList.map(restmenu => {
      const rest = this.restList.find(rest => rest.restaurantID === restmenu.restaurantID);
      const menu = this.menuList.find(menu => menu.menuID === restmenu.menuID);
      return {
        restMenuID: restmenu.restMenuID,
        restaurantID: rest ? rest.restaurantID : null, // boş gelirse null ata(ternary ifade)
        menuID: menu ? menu.menuID : null,
        restaurantAd: rest ? rest.restaurantAd : '',  //boş gelirse
        menuAdi: menu ? menu.menuAdi : '' //boş gelirse
      };
    });
    console.log("rest_restmenu_mergeList: ", this.rest_restmenu_mergeList);
  }


  GET_MERGE_LİST() {
    this.mergeList = this.mergeMenulerList.map(mergeMenuler => {
      const mergeRestMenu = this.rest_restmenu_mergeList.find(mergeRestMenu => mergeRestMenu.menuID === mergeMenuler.menuID);
      return {
        menulerID: mergeMenuler.menulerID,
        menuID: mergeMenuler.menuID,
        menuAdi: mergeMenuler.menuAdi,
        urunAdi: mergeMenuler.urunAdi,
        urunID: mergeMenuler.urunID,
        restMenuID: mergeRestMenu ? mergeRestMenu.restMenuID : null,
        restaurantID: mergeRestMenu ? mergeRestMenu.restaurantID : null,
        restaurantAd: mergeRestMenu ? mergeRestMenu.restaurantAd : ''
      };
    });
    console.log("mergeList:", this.mergeList);
  }


}
