import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { restaurantModel } from 'src/app/models/restaurantModel';
import { kategorilerModel } from 'src/app/models/kategorilerModel';
import { ServiceRestaurantService } from 'src/app/services/service-restaurant.service';
import { ServiceKategoriService } from 'src/app/services/service-kategori.service';
import { forkJoin } from 'rxjs';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-restaurantlar-update',
  templateUrl: './restaurantlar-update.component.html',
  styleUrls: ['./restaurantlar-update.component.css']
})

export class RestaurantlarUpdateComponent implements OnInit {

  mergeForm!: FormGroup;
  restList: restaurantModel[] = [];
  categoryList: kategorilerModel[] = [];
  mergedTableData: any[] = [];
  actionBtn!: string;


  constructor(
    private formBuilder: FormBuilder,
    private apiServiceREST: ServiceRestaurantService,
    private apiServiceCATEGORY: ServiceKategoriService,
    private dialogRef: MatDialogRef<RestaurantlarUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {

    console.log("this.editData: ", this.editData);

    // forkJoin([// Asenkron olarak iki servis çağırılıyor ve veriler birleştiriliyor
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



    // Form Grubunu başlatıyoruz ve form kontrollerini tanımlıyoruz
    this.mergeForm = this.formBuilder.group({
      restaurantID: null,
      restaurantAd: ['', [Validators.required, Validators.maxLength(70)]],
      restaurantAdres: ['', [Validators.required, Validators.maxLength(255)]],
      restaurantTel: ['', [Validators.required, Validators.maxLength(10)]],
      restaurantImg: ['', [Validators.required]],
      // kategoriID: null,
      // kategoriTuru: ['', [Validators.required, Validators.maxLength(50)]]
    });

    // Restoran ve kategori verilerini birleştirerek tablo verilerini elde ediyoruz
    //this.getMergeRestCategoryData();


    // Eğer düzenleme verileri varsa, formu bu verilerle dolduruyoruz
    if (this.editData) { //forma girilen verileri editdata'ya ata 
      this.actionBtn = "Update";

      // this.mergeForm.patchValue({  //forma verileri çekme
      //   restaurantID: this.editData.restaurantID,
      //   restAd: this.editData.restAd,
      //   restAdres: this.editData.restAdres,
      //   restTel: this.editData.restTel,
      //   kategoriID: this.editData.kategoriID,
      //   kategoriTuru: this.editData.kategoriTuru
      // });
      //console.log('patch value', this.editData)


      // Kontrolleri tek tek set ederek de formu doldurabiliriz
      this.mergeForm.controls['restaurantID'].setValue(this.editData.restaurantID);
      this.mergeForm.controls['restaurantAd'].setValue(this.editData.restaurantAd);
      this.mergeForm.controls['restaurantAdres'].setValue(this.editData.restaurantAdres);
      this.mergeForm.controls['restaurantTel'].setValue(this.editData.restaurantTel);
      this.mergeForm.controls['restaurantImg'].setValue(this.editData.restaurantImg);
      // this.mergeForm.controls['kategoriID'].setValue(this.editData.kategoriID);
      // this.mergeForm.controls['kategoriTuru'].setValue(this.editData.kategoriTuru);

    }

  }//ngOnInit end

  // // Restoran ve kategori verilerini birleştirme işlemini gerçekleştiriyoruz
  // getMergeRestCategoryData(): void {
  //   this.mergedTableData = this.restList.map(rest => {
  //     const category = this.categoryList.find(category => category.kategoriID === rest.kategoriID);
  //     return {
  //       restaurantID: rest.restaurantID,
  //       restaurantAd: rest.restaurantAd,
  //       restaurantAdres: rest.restaurantAdres,
  //       restaurantTel: rest.restaurantTel,
  //       restaurantImg: rest.restaurantImg,
  //       kategoriID: rest.kategoriID,
  //       kategoriTuru: category ? category.kategoriTuru : '',
  //     };
  //   });
  //   //console.log("this.mergedTableData: ", this.mergedTableData);
  // }




  // Restoranı güncelleme işlemini gerçekleştiriyoruz
  
  
  updateREST() {
    this.apiServiceREST.put(this.editData.restaurantID, this.mergeForm.value).pipe(
    ).subscribe({
      next: (res) => {
        alert("item Updated successfully");
        this.mergeForm.reset();
        this.dialogRef.close('update');
      },
      error: (error) => {
        // Eğer catchError operatörüne girilen blokta hata olursa burası çalışır
        console.error("Error while updating the item record:", error);
        // Gerekli hata mesajını burada da gösterebiliriz
        alert("Error while updating the item record!");
      }
    });
  }
}
