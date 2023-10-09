import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { restaurantModel } from 'src/app/models/restaurantModel';
import { kategorilerModel } from 'src/app/models/kategorilerModel';
import { ServiceRestaurantService } from 'src/app/services/service-restaurant.service';
import { ServiceKategoriService } from 'src/app/services/service-kategori.service';


@Component({
  selector: 'app-restaurantlar-add',
  templateUrl: './restaurantlar-add.component.html',
  styleUrls: ['./restaurantlar-add.component.css']
})

export class RestaurantlarAddComponent implements OnInit {

  mergeForm!: FormGroup;
  currentRestiId!: number;
  actionBtn: string = "save";

  restList: restaurantModel[] = [];
  // categoryList: kategorilerModel[] = [];
  // mergedTableData: any[] = [];




  constructor(
    private formBuilder: FormBuilder,
    private apiServiceREST: ServiceRestaurantService,
    private apiServiceCATEGORY: ServiceKategoriService,
    private dialogRef: MatDialogRef<RestaurantlarAddComponent>,
  ) { }

  ngOnInit(): void {

    this.mergeForm = this.formBuilder.group({
      restaurantID: null,
      restAd: ['', [Validators.required, Validators.maxLength(70)]],
      restAdres: ['', [Validators.required, Validators.maxLength(255)]],
      restTel: ['', [Validators.required, Validators.maxLength(10)]],
      restaurantImg: ['', [Validators.required]],
      // kategoriID: null,
      // kategoriTuru: ['', [Validators.required, Validators.maxLength(50)]]

    });

    // forkJoin([
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

  }//end ngOnInit

  // getMergeRestCategoryData(): void {
  //   this.mergedTableData = this.restList.map(rest => {
  //     const category = this.categoryList.find(category => category.kategoriID === rest.kategoriID);
  //     return {
  //       restaurantID: rest.restaurantID,
  //       restaurantAd: rest.restaurantAd,
  //       restaurantAdres: rest.restaurantAdres,
  //       restaurantTel: rest.restaurantTel,
  //       kategoriID: rest.kategoriID,
  //       restaurantImg:rest.restaurantImg,
  //       kategoriTuru: category ? category.kategoriTuru : '',
  //     };
  //   });
  //   //console.log("this.mergedTableData: ", this.mergedTableData);
  // }

  addREST() {

    // adress ve kullanıcıyı aynı anda ekleyen fonksiyon
    // console.log("kategoriID: ", this.mergeForm.value.kategoriID);
    // console.log("kategoriTuru: ", this.mergeForm.value.kategoriTuru);
    // console.log("restAdres: ", this.mergeForm.value.restAdres);
    //const kategorituru = this.mergeForm.value.kategoriTuru;

    const restad = this.mergeForm.value.restAd;
    const restAdres = this.mergeForm.value.restAdres;
    const restTel = this.mergeForm.value.restTel;
    const restImg = this.mergeForm.value.restaurantImg;

    this.apiServiceREST.post(restad, restAdres, restTel, restImg).subscribe({
      next: (res) => {
        alert("Öğe başarıyla eklendi");
        this.mergeForm.reset();
        this.dialogRef.close('save');
        window.location.reload(); //sayfayı yeniliyor
      },
      error: (error) => {
        console.error('Hata:', error);
        alert('Hata oluştu: ' + error.message);
      }
    });
  }

}
