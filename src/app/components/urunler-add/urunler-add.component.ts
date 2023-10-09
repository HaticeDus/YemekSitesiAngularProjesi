import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceUrunlerService } from 'src/app/services/service-urunler.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { urunModel } from 'src/app/models/urunModel';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-urunler-add',
  templateUrl: './urunler-add.component.html',
  styleUrls: ['./urunler-add.component.css']
})


export class UrunlerAddComponent implements OnInit {

  urunForm!: FormGroup;
  urun!: urunModel;
  UrunList: any[] = [];
  currentUrunId!: number;
  actionBtn: string = "save";


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ServiceUrunlerService,
    private dialogRef: MatDialogRef<UrunlerAddComponent>,
  ) { }

  ngOnInit(): void {

    this.urunForm = this.formBuilder.group({
      //urunID: null,
      urunAdi: ['', [Validators.required]],
      urunFiyat: ['', [Validators.required]],
      urunImg: ['', [Validators.required]]
    });


    this.getItems()
  }

  getItems(): void {
    this.apiService.get().subscribe(
      (response: any) => {
        this.UrunList = response;
        console.log(this.UrunList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  addUrun() {

    if (this.urunForm.valid) {

      const urunAdi = this.urunForm.get('urunAdi')?.value;
      const urunFiyatString = this.urunForm.get('urunFiyat')?.value;
      const urunFiyat = parseInt(urunFiyatString, 10);
      const urunImg = this.urunForm.get('urunImg')?.value;

      console.log("typeof(urunFiyat): ", typeof (urunFiyat));
      //console.log(this.kategoriForm.value);
      //this.urun = Object.assign({}, this.urunForm.value);
      //console.log(this.urun);


      console.log("urunAdi: ", urunAdi);
      console.log("urunFiyat: ", urunFiyat);
      console.log("typeof(urunFiyat): ", typeof (urunFiyat));



      this.apiService.post(urunAdi, urunFiyat, urunImg).pipe(
        catchError(error => {
          console.error('Hata:', error);
          alert('Hata oluştu: ' + error.message);
          return throwError(error);
        })
      ).subscribe({
        next: (res) => {
          alert("Öğe başarıyla eklendi");
          this.urunForm.reset();
          this.dialogRef.close('save');
        }
      });

    }

  }
}





