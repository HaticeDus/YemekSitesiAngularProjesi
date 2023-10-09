import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { kategorilerModel } from 'src/app/models/kategorilerModel';
import { urunModel } from 'src/app/models/urunModel';
import { ServiceUrunlerService } from 'src/app/services/service-urunler.service';
import { ServiceKategoriService } from 'src/app/services/service-kategori.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-urunler-update',
  templateUrl: './urunler-update.component.html',
  styleUrls: ['./urunler-update.component.css']
})
export class UrunlerUpdateComponent {

  urunList: urunModel[] = [];
  categoryList: kategorilerModel[] = [];
  urunCategoryMergeList: any[] = [];

  urunCategoryForm!: FormGroup;
  actionBtn: string = "save";


  constructor(
    private formBuilder: FormBuilder,
    private apiServiceURUNLER: ServiceUrunlerService,
    private apiServiceCATEGORY: ServiceKategoriService,
    private dialogRef: MatDialogRef<UrunlerUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }


  ngOnInit(): void {

    forkJoin([
      this.apiServiceURUNLER.get(),
      this.apiServiceCATEGORY.get()
    ]).subscribe(
      ([uruns, categories]) => {
        this.urunList = uruns;
        this.categoryList = categories;
        this.getMergeUrunCategoryData();
      },
      (error: any) => {
        console.error(error);
      }
    );


    this.urunCategoryForm = this.formBuilder.group({
      urunID: null,
      urunAdi: ['', [Validators.required]],
      urunFiyat: ['', [Validators.required]],
      urunImg: [''],
      kategoriID: null,
      kategoriTuru: ['', [Validators.required]],
      kategoriImg: ['', [Validators.required]]
    });

    // Eğer düzenleme verileri varsa, formu bu verilerle dolduruyoruz
    if (this.editData) { //forma girilen verileri editdata'ya ata 
      this.actionBtn = "Update";
      // Kontrolleri tek tek set ederek de formu doldurabiliriz
      this.urunCategoryForm.controls['urunID'].setValue(this.editData.urunID);
      this.urunCategoryForm.controls['urunAdi'].setValue(this.editData.urunAdi);
      this.urunCategoryForm.controls['urunFiyat'].setValue(this.editData.urunFiyat);
      this.urunCategoryForm.controls['urunImg'].setValue(this.editData.urunImg);
      //-----------
      this.urunCategoryForm.controls['kategoriID'].setValue(this.editData.kategoriID);
      this.urunCategoryForm.controls['kategoriTuru'].setValue(this.editData.kategoriTuru);
      this.urunCategoryForm.controls['kategoriImg'].setValue(this.editData.kategoriImg);

    }

  }//ngOnInit end

  getMergeUrunCategoryData(): void {
    this.urunCategoryMergeList = this.urunList.map(urun => {
      const category = this.categoryList.find(category => category.kategoriID === urun.kategoriID);
      return {
        urunID: urun.urunID,
        urunAdi: urun.urunAdi,
        urunFiyat: urun.urunFiyat,
        urunImg: urun.urunImg,
        kategoriID: urun.kategoriID,
        kategoriTuru: category ? category.kategoriTuru : '',
        kategoriImg: category ? category.kategoriTuru : ''
      };
    });
    console.log("this.urunCategoryMergeList: ", this.urunCategoryMergeList);
  }

  //urunler update işlemi
  updateUrunler() {

    const urunID = this.urunCategoryForm.get('urunID')?.value;
    this.apiServiceURUNLER.put(urunID, this.urunCategoryForm.value).subscribe({
      next: (res) => {
        alert("item Updated successfully");
        this.urunCategoryForm.reset();
        this.dialogRef.close('update');
      },
      error: (error) => {
        console.error("Error while updating the item record:", error);
        alert("Error while updating the item record!");
      }

    });
  }
}
