import { Component } from '@angular/core';
import { RestaurantlarAddComponent } from '../restaurantlar-add/restaurantlar-add.component';
import { RestaurantlarUpdateComponent } from '../restaurantlar-update/restaurantlar-update.component';
import { ServiceRestaurantService } from 'src/app/services/service-restaurant.service';
import { ServiceKategoriService } from 'src/app/services/service-kategori.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { restaurantModel } from 'src/app/models/restaurantModel';
import { kategorilerModel } from 'src/app/models/kategorilerModel';

@Component({
  selector: 'app-restaurantlar',
  templateUrl: './restaurantlar.component.html',
  styleUrls: ['./restaurantlar.component.css']
})
export class RestaurantlarComponent {

  restList: restaurantModel[] = [];
  // categoryList: kategorilerModel[] = [];
  

  displayedColumns = ['restaurantID', 'restaurantAd', 'restaurantAdres', 'restaurantTel', 'restaurantImg', 'delete', 'update'];
  dataSource = this.restList;


  constructor(
    private apiServiceREST: ServiceRestaurantService,
    private apiServiceCATEGORY: ServiceKategoriService,
    private dialog: MatDialog) { }


  ngOnInit(): void {

    this.getREST();
    // forkJoin([//burada veriler forkJoin ile birlikte alınıyor tek tek almaya gerek yok
    //   this.apiServiceREST.get(),
    //   this.apiServiceCATEGORY.get()
    // ]).subscribe(
    //   ([rests, categories]) => {
    //     this.restList = rests;
    //     this.categoryList = categories;
    //     this.getMergeRestCategoryData();
    //   },
    //   (error: any) => {
    //     console.error(error);
    //   }
    // );
  }

  // getMergeRestCategoryData(): void {
  //   this.mergedTableData = this.restList.map(rest => {
  //     const category = this.categoryList.find(category => category.kategoriID === rest.kategoriID);
  //     return {
  //       restaurantID: rest.restaurantID,
  //       restaurantAd: rest.restaurantAd,
  //       restaurantAdres: rest.restaurantAdres,
  //       restaurantTel: rest.restaurantTel,
  //       restaurantImg:rest.restaurantImg,
  //       kategoriID: rest.kategoriID,
  //       kategoriTuru: category ? category.kategoriTuru : '',
  //     };
  //   });
  //   console.log("this.mergedTableData: ", this.mergedTableData);
  // }

  getREST(): void {
    this.apiServiceREST.get().subscribe(
      (response: any) => {
        this.restList = response;
        console.log(this.restList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }








  adddialog() { //add dialog 
    this.dialog.open(RestaurantlarAddComponent, {
      height: '600px',
      width: '400px',

    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getREST();
        window.location.reload();
      }
    })
  }

  updatedialog(row: any) { // update ve delete tablonun olduğu yerde olmalı!! //update dialog
    this.dialog.open(RestaurantlarUpdateComponent, {
      height: '600px',
      width: '400px',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getREST();
        window.location.reload();
      }
    })
  }

  deleteItems(id: number): void {
    this.apiServiceREST.delete(id).subscribe({
      next: (res) => {
        debugger
        alert("item Deleted Succesfully");
        //this.getMergeUserAddressData();
        window.location.reload(); //sayfayı yeniliyor
      },
      error: () => {

        alert("Error while deleting the item!");
      }
    })
  }
}



  // getCAT(): void {
  //   this.apiServiceCATEGORY.get().subscribe(
  //     (response: any) => {
  //       this.categoryList = response;
  //       console.log(this.categoryList);
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }
