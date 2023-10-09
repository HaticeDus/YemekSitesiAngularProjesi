import { Component, OnInit } from '@angular/core';
import { ServiceKategoriService } from 'src/app/services/service-kategori.service';
import { KategoriAddComponent } from '../kategori-add/kategori-add.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { KategoriUpdateComponent } from '../kategori-update/kategori-update.component';
//import { MatDialogModule } from '@angular/material/dialog';
//import { MatTableModule } from '@angular/material/table';
//import { kategoriler } from 'src/app/models/kategoriler';


@Component({
  selector: 'app-kategoriler',
  templateUrl: './kategoriler.component.html',
  styleUrls: ['./kategoriler.component.css']

})


export class KategorilerComponent implements OnInit {

  kategorilerList: any[] = [];

  displayedColumns = ['kategorId', 'kategoriTuru','kategoriImg', 'delete', 'update'];
  dataSource = this.kategorilerList;
  constructor(private apiService: ServiceKategoriService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.apiService.get().subscribe(
      (response: any) => {
        this.kategorilerList = response;
        //console.log(this.kategorilerList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateKategoridialog(row: any) { // update ve delete tablonun olduğu yerde olmalı!! //update dialog
    this.dialog.open(KategoriUpdateComponent, {
      height: '200px',
      width: '400px',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getItems();
      }
    })
  }

  addKategoridialog() { //add dialog 
    this.dialog.open(KategoriAddComponent, {
      height: '200px',
      width: '400px',
    
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getItems();
      }
    })
  }


  deleteItems(id: number): void {
    this.apiService.delete(id).subscribe({
      next: (res) => {
        alert("item Deleted Succesfully");
        this.getItems();
      },
      error: () => {
        alert("Error while deleting the item!");
      }
    });
  }


}
