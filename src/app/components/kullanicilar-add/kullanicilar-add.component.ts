import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceKullanicilarService } from 'src/app/services/service-kullanicilar.service';
import { ServiceAdresService } from 'src/app/services/service-adres.service';
import { forkJoin } from 'rxjs';
import { userModels } from 'src/app/models/userModel';
import { adressModels } from 'src/app/models/adressModel';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-kullanicilar-add',
  templateUrl: './kullanicilar-add.component.html',
  styleUrls: ['./kullanicilar-add.component.css']
})

export class KullanicilarAddComponent implements OnInit {

  showPassword: boolean = false;

  mergeForm!: FormGroup;
  userList: userModels[] = [];
  adresList: adressModels[] = [];
  mergedTableData: any[] = [];

  currentuseriId!: number;
  actionBtn: string = "save";


  constructor(
    private formBuilder: FormBuilder,
    private apiServiceUSER: ServiceKullanicilarService,
    private apiServiceADRESS: ServiceAdresService,
    private dialogRef: MatDialogRef<KullanicilarAddComponent>,
  ) { }

  ngOnInit(): void {

    this.mergeForm = this.formBuilder.group({
      userID: null,
      ad: ['', [Validators.required, Validators.maxLength(25)]],
      soyad: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])],
      tel: ['', [Validators.required, Validators.maxLength(11)]],
      adresID: null,
      evAdresi: ['', [Validators.required, Validators.maxLength(200)]],
      isAdresi: ['', [Validators.required, Validators.maxLength(200)]]

    });

    forkJoin([ //asekron verileri beraber getirdi
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

  getMergeUserAddressData(): void { //merge edilen liste geldi
    this.mergedTableData = this.userList.map(user => {
      const address = this.adresList.find(address => address.adresID === user.adresId);
      return {
        userID: user.userID,
        ad: user.ad,
        soyad: user.soyad,
        email: user.email,
        tel: user.tel,
        adresId: user.adresId,
        evAdresi: address ? address.evAdresi : '',
        isAdresi: address ? address.isAdresi : ''
      };
    });
    console.log("this.mergedTableData: ", this.mergedTableData);
  }

  addUserAndAdress() { //adress ve kullanıcıyı aynı anda ekleyen fonksiyon

    // console.log("this.mergeForm.value.evAdresi: ", this.mergeForm.value.evAdresi);
    // console.log("this.mergeForm.value.isAdresi: ", this.mergeForm.value.isAdresi);
    // console.log("this.mergeForm.value.ad: ", this.mergeForm.value.ad);
    // console.log("this.mergeForm.value.soyad: ", this.mergeForm.value.soyad);
    // console.log("this.mergeForm.value.email: ", this.mergeForm.value.email);
    // console.log("this.mergeForm.value.tel: ", this.mergeForm.value.tel);

    this.apiServiceADRESS.post(this.mergeForm.value.evAdresi, this.mergeForm.value.isAdresi).pipe(
      switchMap(adresResponse => {
        const adresId = adresResponse.adresID;
        const ad = this.mergeForm.value.ad;
        const soyad = this.mergeForm.value.soyad;
        const email = this.mergeForm.value.email;
        const password = this.mergeForm.value.password;
        const tel = this.mergeForm.value.tel;
        console.log("adresId: ", adresId);
        return this.apiServiceUSER.post(ad, soyad, email, password, tel, adresId);
      }),
      catchError(error => {
        console.error('Hata:', error);
        alert('Hata oluştu: ' + error.message);
        return throwError(error);
      })
    ).subscribe({
      next: (res) => {
        alert("Öğe başarıyla eklendi");
        this.mergeForm.reset();
        this.dialogRef.close('save');
        //this.getMergeUserAddressData();// Yeni verileri güncelle
        window.location.reload(); //sayfayı yeniliyor
      }
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  isPasswordHintVisible(): boolean {
    const passwordControl = this.mergeForm.get('password');
    return !!passwordControl?.invalid && (passwordControl.dirty || passwordControl.touched);
  }
  
}



 // addAdress() { //adress ekleyen metod //ayrı ayrı

  //   this.apiServiceADRESS.post(this.mergeForm.value.evAdresi, this.mergeForm.value.isAdresi).pipe(
  //     catchError(error => {
  //       console.error('Hata:', error);
  //       alert('Hata oluştu: ' + error.message);
  //       return throwError(error);
  //     })
  //   ).subscribe({
  //     next: (res) => {
  //       alert("Öğe başarıyla eklendi");
  //       this.mergeForm.reset();
  //       this.dialogRef.close('save');
  //     }
  //   });
  // }


// addUser() { //kullanıcı ekleyen metod //ayrı ayrı

  //   this.apiServiceUSER.post(this.mergeForm.value.ad, this.mergeForm.value.soyad, this.mergeForm.value.email, this.mergeForm.value.tel, this.mergeForm.value.adresID).pipe(
  //     catchError(error => {
  //       console.error('Hata:', error);
  //       alert('Hata oluştu: ' + error.message);
  //       return throwError(error);
  //     })
  //   ).subscribe({
  //     next: (res) => {
  //       alert("Öğe başarıyla eklendi");
  //       this.mergeForm.reset();
  //       this.dialogRef.close('save');
  //     }
  //   });
  // }
