import { Component, Input, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Inject } from '@angular/core';
import { ServiceUrunlerService } from 'src/app/services/service-urunler.service';
import { ServiceRestMenuService } from 'src/app/services/service-rest-menu.service';
import { UrunlerUpdateComponent } from '../urunler-update/urunler-update.component';
import { UrunlerAddComponent } from '../urunler-add/urunler-add.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { urunModel } from 'src/app/models/urunModel';
import { rest_urunModel } from 'src/app/models/rest_urunModel';
// import { ActivatedRoute } from '@angular/router';
import { ServiveSharedDataService } from 'src/app/services/servive-shared-data.service';


@Component({
  selector: 'app-urunler',
  templateUrl: './urunler.component.html',
  styleUrls: ['./urunler.component.css']
})
export class UrunlerComponent {

  urunList: urunModel[] = [];
  resturunList: rest_urunModel[] = [];
  MergeList: any[] = []; //resturun ile urun listesini birleştiren liste

 // @Input() SelectedRestaurantID: any; // gelen veriyi almak için 
  //kategori-home'dan kategoriId alındı
  //selectedKategoriID: any;
  //item: any;

  displayedColumns = ['urunID', 'urunAdi', 'urunFiyat', 'kategoriID', 'urunImg', 'delete', 'update'];
  dataSource = this.urunList;


  constructor(
    private apiServiceURUNLER: ServiceUrunlerService,
    private apiServiceRESTURUN: ServiceRestMenuService,
    // private route: ActivatedRoute,
    private sharedDataService: ServiveSharedDataService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {

    // this.getKategoriID();

    forkJoin([
      this.apiServiceURUNLER.get(),
      this.apiServiceRESTURUN.get()
    ]).subscribe(
      ([uruns, resturuns]) => {
        this.urunList = uruns;
        this.resturunList = resturuns;
        this.getMergeList();
        // this.setrestaurantID();
        //console.log("this.resturunList", this.resturunList)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }//end ngOnInit 


  // async getKategoriID() {
  //   this.selectedKategoriID = await this.sharedDataService.getKategoriID();
  //   console.log("gelen selectedKategoriID: ", this.selectedKategoriID);
  // }

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
    // this.sharedDataService.setrestaurantID(this.restaurantID);//restaurantID bilgigsi service ile gönderilecek
    // console.log("gönderilen restaurantID ", this.restaurantID);

    /////////
    // this.item = this.MergeList.find(item => item.kategoriID === this.selectedKategoriID);
    // console.log(" this.item.restaurantID:  ",  this.item.restaurantID);
    // this.SelectedRestaurantID= this.item.restaurantID;
    // this.sharedDataService.setrestaurantID(this.SelectedRestaurantID);

  }



  //  async setrestaurantID() {
  //     // KategoriID'ye ait resturun'ı buluyoruz
  //     const matchedRestUrun = this.MergeList.find(item => item.kategoriID === this.selectedKategoriID);
  //     console.log("matchedRestUrun: ", matchedRestUrun);
  //     if (matchedRestUrun) {
  //       this.SelectedRestaurantID = matchedRestUrun.restaurantID;
  //      await this.sharedDataService.setrestaurantID(this.SelectedRestaurantID);
  //       console.log("gönderilen restaurantID ", this.SelectedRestaurantID);
  //     }
  //     else {
  //       console.log("Eşleşen kategori ID bulunamadı.");
  //     }
  //   }

  updatedialog(row: any) { // update ve delete tablonun olduğu yerde olmalı!! //update dialog
    this.dialog.open(UrunlerUpdateComponent, {
      height: '550px',
      width: '400px',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.urunList
      }
    })
  }
  adddialog() { //add dialog +
    this.dialog.open(UrunlerAddComponent, {
      height: '400px',
      width: '400px',

    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.urunList
      }
    })
  }
  deleteItems(id: number): void {//+
    this.apiServiceURUNLER.delete(id).subscribe({
      next: (res) => {
        alert("item Deleted Succesfully");
        this.urunList
      },
      error: () => {
        alert("Error while deleting the item!");
      }
    })
  }

}
