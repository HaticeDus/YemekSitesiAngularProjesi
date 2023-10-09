import { Component } from '@angular/core';
import { ServiceKullanicilarService } from 'src/app/services/service-kullanicilar.service';
import { ServiceAdresService } from 'src/app/services/service-adres.service';
import { userModels } from 'src/app/models/userModel';
import { adressModels } from 'src/app/models/adressModel';
import { forkJoin } from 'rxjs';
import { KullanicilarAddComponent } from '../kullanicilar-add/kullanicilar-add.component';
import { KullanicilarUpdateComponent } from '../kullanicilar-update/kullanicilar-update.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-kullanicilar',
  templateUrl: './kullanicilar.component.html',
  styleUrls: ['./kullanicilar.component.css']
})
export class KullanicilarComponent {

  userList: userModels[] = [];
  adresList: adressModels[] = [];
  mergedTableData: any[] = [];

  displayedColumns = ['userID', 'ad', 'soyad', 'email','password', 'tel', /*'adresId',*/ 'evAdresi', 'isAdresi','role','isactive', 'delete', 'update'];
  dataSource = this.userList;


  constructor(private apiServiceUSER: ServiceKullanicilarService, private apiServiceADRESS: ServiceAdresService, private dialog: MatDialog) { }

  ngOnInit(): void {
    forkJoin([
      this.apiServiceUSER.get(),
      this.apiServiceADRESS.get()
    ]).subscribe(
      ([users, addresses]) => {
        this.userList = users;
        this.adresList = addresses;
        this.getMergeUserAddressData();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  //Ayrı ayrı verileri getirmeye gerek yok forkJoin ile asekron geliyor.
  // getUSER(): void {
  //   this.apiServiceUSER.get().subscribe(
  //     (response: any) => {
  //       this.userList = response;
  //       console.log(this.userList);
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // getADRESS(): void {
  //   this.apiServiceADRESS.get().subscribe(
  //     (response: any) => {
  //       this.adresList = response;
  //       console.log(this.adresList);
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }

  getMergeUserAddressData(): void {
    this.mergedTableData = this.userList.map(user => {
      const address = this.adresList.find(address => address.adresID === user.adresId);

      return { //her bir kullanıcı için bir nesne oluşturulur
        userID: user.userID,
        ad: user.ad,
        soyad: user.soyad,
        email: user.email,
        password: user.password,
        tel: user.tel,
        role:user.role,
        isactive:user.isactive,
        adresId: user.adresId,
        evAdresi: address ? address.evAdresi : '', //address değişkeni tanımlı ise onun özelliklerine eriş!
        isAdresi: address ? address.isAdresi : ''
      };
    });
    console.log("this.mergedTableData: ", this.mergedTableData);
  }

  adddialog() { //add dialog 
    this.dialog.open(KullanicilarAddComponent, {
      height: '750px',
      width: '500px',

    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getMergeUserAddressData();
      }
    })
  }

  updatedialog(row: any) { // update ve delete tablonun olduğu yerde olmalı!! //update dialog
    this.dialog.open(KullanicilarUpdateComponent, {
      height: '750px',
      width: '500px',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getMergeUserAddressData();
      }
    })
  }


  deleteItems(id: number): void {
    this.apiServiceUSER.delete(id).subscribe({
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
