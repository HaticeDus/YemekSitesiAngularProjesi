import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MenulerAddComponent } from '../menuler-add/menuler-add.component';
import { menulerModel } from 'src/app/models/menulerModel';
import { menuModel } from 'src/app/models/menuModel';
import { urunModel } from 'src/app/models/urunModel';
import { ServiceUrunlerService } from 'src/app/services/service-urunler.service';
import { ServiceMenuService } from 'src/app/services/service-menu.service';
import { ServiceMenulerService } from 'src/app/services/service-menuler.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-menuler',
  templateUrl: './menuler.component.html',
  styleUrls: ['./menuler.component.css']
})
export class MenulerComponent implements AfterViewInit {


  menuList: menuModel[] = [];
  urunList: urunModel[] = [];
  menulerList: menulerModel[] = [];
  mergeMenulerList: any[] = [];


  displayedColumns = ['menulerID', 'menuAdi', 'urunAdi', 'delete'];
  //dataSource = this.mergeMenulerList;
  dataSource = new MatTableDataSource<any>(this.mergeMenulerList);

  // ViewChild ile MatPaginator öğesini bileşende referans olarak alın
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private apiServiceURUN: ServiceUrunlerService,
    private apiServiceMENU: ServiceMenuService,
    private apiServiceMENULER: ServiceMenulerService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {

    forkJoin([ //asekron beraber 3 service i çağrıldı
      this.apiServiceURUN.get(),
      this.apiServiceMENU.get(),
      this.apiServiceMENULER.get()
    ]).subscribe(
      ([uruns, menus, menulers]) => {
        this.urunList = uruns;
        this.menuList = menus;
        this.menulerList = menulers;
        this.getMerge_Menuler(); // diziyi çağırdım
      },
      (error: any) => {
        console.error(error);
      }
    );
    this.getMerge_Menuler();
  }

  getMerge_Menuler() { //ortak dizi oluşturma 
    this.mergeMenulerList = this.menulerList.map(menuler => {
      const urun = this.urunList.find(urun => urun.urunID === menuler.urunID);
      const menu = this.menuList.find(menu => menu.menuID === menuler.menuID);
      return {
        menulerID: menuler.menulerID,
        urunAdi: urun ? urun.urunAdi : '', //boş gelirse
        menuAdi: menu ? menu.menuAdi : ''//boş gelirse
      };
    });
    //console.log("mergeMenulerList:", this.mergeMenulerList);
    this.dataSource.data = this.mergeMenulerList;
  }


  adddialog() { //add dialog 
    this.dialog.open(MenulerAddComponent, {
      height: '400px',
      width: '500px',
      data: { //dizileri MenulerAddComponent'e geçiyoruz
        mergeMenulerList: this.mergeMenulerList,
        urunList: this.urunList,
        menuList: this.menuList

      }

    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getMerge_Menuler();
      }
    })
  }

  deleteItems(id: number): void {
    this.apiServiceMENULER.delete(id).subscribe({
      next: (res) => {
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

