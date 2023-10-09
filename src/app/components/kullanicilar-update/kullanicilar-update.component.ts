import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceKullanicilarService } from 'src/app/services/service-kullanicilar.service';
import { ServiceAdresService } from 'src/app/services/service-adres.service';
import { forkJoin } from 'rxjs';
import { userModels } from 'src/app/models/userModel';
import { adressModels } from 'src/app/models/adressModel';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kullanicilar-update',
  templateUrl: './kullanicilar-update.component.html',
  styleUrls: ['./kullanicilar-update.component.css']
})
export class KullanicilarUpdateComponent implements OnInit {
  showPassword: boolean = false;
  mergeForm!: FormGroup;
  userList: userModels[] = [];
  adresList: adressModels[] = [];
  mergedTableData: any[] = [];
  actionBtn!: string;


  constructor(
    private formBuilder: FormBuilder,
    private apiServiceUSER: ServiceKullanicilarService,
    private apiServiceADRESS: ServiceAdresService,
    private dialogRef: MatDialogRef<KullanicilarUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
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
      adresId: null,
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

    if (this.editData) {

      this.actionBtn = "Update";
      this.mergeForm.controls['userID'].setValue(this.editData.userID);
      this.mergeForm.controls['ad'].setValue(this.editData.ad);
      this.mergeForm.controls['soyad'].setValue(this.editData.soyad);
      this.mergeForm.controls['email'].setValue(this.editData.email);
      this.mergeForm.controls['password'].setValue(this.editData.password);
      this.mergeForm.controls['tel'].setValue(this.editData.tel);
      this.mergeForm.controls['adresId'].setValue(this.editData.adresId);
      this.mergeForm.controls['evAdresi'].setValue(this.editData.evAdresi);
      this.mergeForm.controls['isAdresi'].setValue(this.editData.isAdresi);
    }


  }//end of ngOnInit

  getMergeUserAddressData(): void { //merge edilen liste geldi
    this.mergedTableData = this.userList.map(user => {
      const address = this.adresList.find(address => address.adresID === user.adresId);
      return {
        userID: user.userID,
        ad: user.ad,
        soyad: user.soyad,
        email: user.email,
        password: user.password,
        tel: user.tel,
        adresId: user.adresId,
        evAdresi: address ? address.evAdresi : '',
        isAdresi: address ? address.isAdresi : ''
      };
    });
    console.log("this.mergedTableData: ", this.mergedTableData);
  }

  updateUserAndAdress() { //adress ve kullanıcıyı aynı anda ekleyen fonksiyon

    console.log("this.editData.userID: ", this.editData.userID);
    console.log("this.editData.adresId: ", this.editData.adresId);

    this.apiServiceUSER.put(this.editData.userID, this.mergeForm.value).pipe(
      switchMap(adresResponse => {
        console.log("this.mergeForm.value: ", this.mergeForm.value);
        //debugger
        return this.apiServiceADRESS.put(this.mergeForm.value.adresId, this.mergeForm.value);
      }),
      catchError(error => {
        console.error('Hata:', error);
        alert('Hata oluştu: ' + error.message);
        return throwError(error);
      })
    ).subscribe({
      next: (res) => {
        alert("Öğe başarıyla güncellendi");
        this.mergeForm.reset();
        this.dialogRef.close('update');
        // this.getMergeUserAddressData();// Yeni verileri güncelle
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


  // updateUserAndAdress() { //başka update metodu çalışıyor
  //   console.log("this.editData.userID: ", this.editData.userID);
  //   console.log("this.editData.adresId: ", this.editData.adresId);

  //   forkJoin([
  //     this.apiServiceUSER.put(this.editData.userID, this.mergeForm.value),
  //     this.apiServiceADRESS.put(this.mergeForm.value.adresId, this.mergeForm.value)
  //   ]).subscribe(
  //     () => {
  //       alert("Öğe başarıyla güncellendi");
  //       this.mergeForm.reset();
  //       this.dialogRef.close('update');
  //       this.getMergeUserAddressData(); // Yeni verileri güncelle
  //     },
  //     (error: any) => {
  //       console.error('Hata:', error);
  //       alert('Hata oluştu: ' + error.message);
  //     }
  //   );
  // }

}
