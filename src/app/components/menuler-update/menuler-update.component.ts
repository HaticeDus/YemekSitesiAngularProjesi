import { Component, OnInit, Inject } from '@angular/core';
import { menulerModel } from 'src/app/models/menulerModel';
import { menuModel } from 'src/app/models/menuModel';
import { urunModel } from 'src/app/models/urunModel';
import { ServiceUrunlerService } from 'src/app/services/service-urunler.service';
import { ServiceMenuService } from 'src/app/services/service-menu.service';
import { ServiceMenulerService } from 'src/app/services/service-menuler.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //MAT_DIALOG_DATA (gelen parametreyi alabilmek için)
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators'; // map operatörü
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-menuler-update',
  templateUrl: './menuler-update.component.html',
  styleUrls: ['./menuler-update.component.css']
})
export class MenulerUpdateComponent {

  mergeForm!: FormGroup;
  currentRestiId!: number;
  actionBtn!: string;
  editData!: any;

  menuList: menuModel[] = [];
  urunList: urunModel[] = [];
  menulerList: menulerModel[] = [];
  mergeMenulerList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiServiceURUN: ServiceUrunlerService,
    private apiServiceMENU: ServiceMenuService,
    private apiServiceMENULER: ServiceMenulerService,
    private dialogRef: MatDialogRef<MenulerUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any) {  // Gelen veriyi burada alıyoruz

    this.mergeMenulerList = Data.mergeMenulerList;
    this.urunList = Data.urunList;
    this.menuList = Data.menuList;
    this.editData = Data.row;
  }
  ngOnInit(): void {

    // this.mergeMenulerList;//verileri çağırıyorum
    // console.log("this.mergeMenulerList: ", this.mergeMenulerList);

    // this.menuList;//verileri çağırıyorum
    // console.log("this.menuList: ", this.menuList);

    this.editData; // update edilecek veri geldi!
    console.log('this.editData: ', this.editData)


    this.mergeForm = this.formBuilder.group({
      menulerID: null,
      menuID: null,
      menuAdi: ['', [Validators.required]],
      urunID: null,  // urunID'yi, seçilen birden çok değeri tutmak için boş bir dizi olarak ayarladım
      urunAdi: ['', [Validators.required]]
    });

    // Urun adını urunAdiList'e eklemek için
    //this.urunAdiList.push(this.mergeForm.value.urunAdi);


    // Eğer düzenleme verileri varsa, formu bu verilerle dolduruyoruz
    if (this.editData) { //forma girilen verileri editdata'ya ata 
      this.actionBtn = "Save";
      this.mergeForm.controls['menuID'].setValue(this.editData);
    }
    //console.log("this.editData: ",this.editData)
  }//ngOninit end

  updateMENULER() {""

    console.log("this.editData :", this.editData);
    console.log("this.mergeForm.value :", this.mergeForm.value.urunID);

    this.apiServiceMENULER.post(this.editData, this.mergeForm.value.urunID).pipe(
    ).subscribe({
      next: (res) => {
        alert("item Updated successfully");
        this.mergeForm.reset();
        this.dialogRef.close('save');
        window.location.reload();
      },
      error: (error) => {
        console.error("Error while updating the item record:", error);
        alert("Error while updating the item record!");
      }
    });
  }
}
