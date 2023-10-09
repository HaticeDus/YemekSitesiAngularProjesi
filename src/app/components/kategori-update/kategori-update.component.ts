import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceKategoriService } from 'src/app/services/service-kategori.service';
import { kategorilerModel } from 'src/app/models/kategorilerModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-kategori-update',
  templateUrl: './kategori-update.component.html',
  styleUrls: ['./kategori-update.component.css']
})
export class KategoriUpdateComponent implements OnInit {

  kategoriForm!: FormGroup;
  kategorilerList: kategorilerModel[] = [];
  currentkategoriId!: number;
  actionBtn: string = "save";

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ServiceKategoriService,
    private dialogRef: MatDialogRef<KategoriUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }


  ngOnInit(): void {

    this.kategoriForm = this.formBuilder.group({
      kategoriID: null,
      kategoriTuru: ['', [Validators.required]]
    });


    this.getItems()
    //console.log(this.editData.id);
    console.log(this.editData);

    if (this.editData) {
      this.actionBtn = "Update";
      const a = this.kategoriForm.controls['kategoriID'].setValue(this.editData.kategoriID);
      console.log("a: ", a);
      this.kategoriForm.controls['kategoriTuru'].setValue(this.editData.kategoriTuru);
    }
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

  updateKategori() {

    this.apiService.put(this.editData.kategoriID, this.kategoriForm.value).subscribe({
      next: (res) => {
        alert("item Updated successfully");
        this.kategoriForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Error while updating the item record!");
      }
    });

    console.log(this.editData);
    console.log(this.editData.kategoriID);
    console.log(this.kategoriForm.value);

  }
}
