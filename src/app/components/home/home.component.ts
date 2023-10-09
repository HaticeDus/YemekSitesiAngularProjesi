import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { userModels } from 'src/app/models/userModel';
import { MatStepper } from '@angular/material/stepper';
import { ServiceUrunlerService } from 'src/app/services/service-urunler.service';
import { ServiceRestUrunService } from 'src/app/services/service-rest-urun.service';
import { ServiveSharedDataService } from 'src/app/services/servive-shared-data.service';
import { urunModel } from 'src/app/models/urunModel';
import { rest_urunModel } from 'src/app/models/rest_urunModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent /*implements AfterViewInit*/ {

  urunList: urunModel[] = [];
  resturunList: rest_urunModel[] = [];
  MergeList: any[] = []; //resturun ile urun listesini birleştiren liste





  //@ViewChild('stepper', { static: false }) public stepper!: MatStepper;
  findUser: userModels | undefined; // Kullanıcı bilgilerini tutacak değişken
  loggedIn: boolean = false; // Kullanıcının giriş durumunu tutacak değişken

  selectedKategoriID: any; //gelen -htmlde-
  selectedRestaurantID: any;//gönderilecek -htmlde-
  matchedRestUruns: any[] = [];
  restaurantIDs: any[] = [];

  constructor(
    private apiServiceURUNLER: ServiceUrunlerService,
    private apiServiceRESTURUN: ServiceRestUrunService,
    private sharedDataService: ServiveSharedDataService,
  ) { }



  //search box için
  searchTerm: string = '';
  onSearchValueChanged(value: string) {
    this.searchTerm = value;
  }




  ngOnInit(): void {
    this.getDataStorage();
    //console.log("this.stepper", this.stepper)

    forkJoin([
      this.apiServiceURUNLER.get(),
      this.apiServiceRESTURUN.get()
    ]).subscribe(
      ([uruns, resturuns]) => {
        this.urunList = uruns;
        this.resturunList = resturuns;
        this.getMergeList();
        //this.setrestaurantID();

        //console.log("this.resturunList", this.resturunList)
      },
      (error: any) => {
        console.error(error);
      }
    );


  }

  setKategoriID(kategoriID: any) {//output ile kategori-home'dan geldi
    this.selectedKategoriID = kategoriID;
    console.log(' gelen kategoriID this.selectedKategoriID:', this.selectedKategoriID);
    this.setrestaurantID(); // setKategoriID çalıştığında setrestaurantID de çağrılır

  }

  async setrestaurantID() {
    // KategoriID'ye ait resturun'ı buluyoruz
    this.matchedRestUruns = this.MergeList.filter(item => item.kategoriID === this.selectedKategoriID);
    console.log("matchedRestUruns", this.matchedRestUruns);
    //restaurantID'leri
    this.restaurantIDs = this.matchedRestUruns.map(item => item.restaurantID);
    console.log("restaurantIDs", this.restaurantIDs);
   // this.sharedDataService.setRestaurantIDs(this.restaurantIDs);//restaurantID bilgigsi service ile gönderilecek
    
    //   const matchedRestUrun = this.MergeList.find(item => item.kategoriID === this.selectedKategoriID);
    //   console.log("this.selectedKategoriID: ", this.selectedKategoriID);
    //   console.log("matchedRestUrun: ", matchedRestUrun);
    //  console.log("this.MergeList:  ", this.MergeList);
    //   if (matchedRestUrun) {
    //     this.selectedRestaurantID = matchedRestUrun.restaurantID;
    //     console.log("restaurant-home'a gönderilen restaurantID ", this.selectedRestaurantID);
    //   }
    //   else {
    //     console.log("Eşleşen kategori ID bulunamadı.");
    //   }
  }




  getMergeList(): void {
    this.MergeList = this.urunList.map(urun => {
      const resturun = this.resturunList.find(resturun => resturun.urunID === urun.urunID);
      return {
        urunID: urun.urunID,
        urunAdi: urun.urunAdi,
        urunFiyat: urun.urunFiyat,
        urunImg: urun.urunImg,
        kategoriID: urun.kategoriID,
        restUrunID: resturun ? resturun.restUrunID : null,
        restaurantID: resturun ? resturun.restaurantID : null,
      };
    });
    console.log("this.MergeList:  ", this.MergeList);
  }








  // ngAfterViewInit() {
  //   // stepper artık AfterViewInit zamanında tanımlanacak
  // }

  // goToNextStepRest(kategoriID: any) {
  //   this.selectedKategoriID = kategoriID;
  //   console.log('kategoriID:', kategoriID);

  //   if (kategoriID !== null && kategoriID !== undefined && this.stepper) {
  //     this.stepper.next();
  //   }
  // }

  // goToNextStepMenu(restaurantID: any) {
  //   this.selectedRestaurantID = restaurantID;
  //   console.log('restaurantID:', restaurantID);

  //   if (restaurantID !== null && restaurantID !== undefined && this.stepper) {
  //     this.stepper.next();
  //   }
  // }



  // Özyinelemeli olarak localStorage'den veriyi al
  async getDataStorage() {
    const loggedInUser = await this.getLoggedInUser();
    if (loggedInUser) {
      this.loggedIn = true; // Kullanıcı giriş yapmış olarak işaretlenir
      this.findUser = JSON.parse(loggedInUser);
    }
  }

  // localStorage'den veriyi almak için promisified bir fonksiyon
  private getLoggedInUser(): Promise<string | null> {
    return new Promise((resolve) => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      resolve(loggedInUser);
    });
  }
}
