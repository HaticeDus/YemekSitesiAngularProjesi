import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceKategoriService } from 'src/app/services/service-kategori.service';
import { kategorilerModel } from 'src/app/models/kategorilerModel';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-kategori-add',
  templateUrl: './kategori-add.component.html',
  styleUrls: ['./kategori-add.component.css']
})
export class KategoriAddComponent implements OnInit {

  kategoriForm!: FormGroup;
  category!: kategorilerModel;
  kategorilerList: kategorilerModel[] = [];
  currentkategoriId!: number;
  actionBtn: string = "save";

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ServiceKategoriService,
    private dialogRef: MatDialogRef<KategoriAddComponent>,
  ) { }


  ngOnInit(): void {

    this.kategoriForm = this.formBuilder.group({
      // kategoriID: null,
      kategoriTuru: ['', [Validators.required]]
    });


    this.getItems()
  }

  getItems(): void {
    this.apiService.get().subscribe(
      (response: any) => {
        this.kategorilerList = response;
        console.log(this.kategorilerList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // addKategori() {
  //   console.log(this.kategoriForm.value);
  //   this.apiService.post(this.kategoriForm.value).subscribe({
  //     next: (res) => {
  //       alert("item added successfully");
  //       this.kategoriForm.reset();
  //       this.dialogRef.close('save')
  //     },
  //     error: () => {
  //       alert("Error while adding the item");
  //     }
  //   });

  //   //console.log(this.kategoriForm.value);
  //   // console.log(this.addtData);
  //   // console.log(this.addtData.kategoriID);
  // }

  // this.brand = Object.assign({}, this.brandAddForm.value);
  // this.brand = Object.assign({}, this.kategoriForm.value);

  addKategori() {
    console.log(this.kategoriForm.value);
    this.category = Object.assign({}, this.kategoriForm.value);
    console.log('this.category: ', this.category);

    this.apiService.post(this.category.kategoriTuru).pipe(
      catchError(error => {
        console.error('Hata:', error);
        alert('Hata oluştu: ' + error.message);
        return throwError(error);
      })
    ).subscribe({
      next: (res) => {
        alert("Öğe başarıyla eklendi");
        this.kategoriForm.reset();
        this.dialogRef.close('save');
      }
    });
  }

}


