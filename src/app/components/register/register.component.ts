import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceKullanicilarService } from 'src/app/services/service-kullanicilar.service';
import { ServiceAdresService } from 'src/app/services/service-adres.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router'; // yönlendirme işlemi



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  showPassword: boolean = false;
  formInitialized: boolean = false; // Form başlatıldı mı kontrolü

  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private apiServiceUSER: ServiceKullanicilarService,
    private apiServiceADRESS: ServiceAdresService,
  ) { }



  ngOnInit(): void {
    this.initForm(); //asenkron olarak yapılabileceği olasılığına karşı kontrol


  }//ngOnInit end

  async initForm() {
    this.registerForm = this.formBuilder.group({
      //userID: null,
      ad: ['', [Validators.required, Validators.maxLength(25)]],
      soyad: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      tel: ['', [Validators.required, Validators.maxLength(11)]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])],
      //adresID: null,
      evAdresi: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      isAdresi: ['', [Validators.required, Validators.maxLength(200)]],
      role: [''],
      isactive: false
    });

    this.formInitialized = true; // Form başlatıldı

  }


  addUserAndAdress() { //adress ve kullanıcıyı aynı anda ekleyen fonksiyon

    console.log("this.registerForm.value: ", this.registerForm.value);
    console.log("\n\n\n\nthis.formInitialized :", this.formInitialized+"\n"+"this.registerForm.valid :", this.registerForm.valid);
  

    if (this.formInitialized /*&& this.registerForm.valid*/) {

      this.apiServiceADRESS.post(this.registerForm.value.evAdresi, this.registerForm.value.isAdresi).pipe(
        switchMap(adresResponse => {
          const adresId = adresResponse.adresID;
          const ad = this.registerForm.value.ad;
          const soyad = this.registerForm.value.soyad;
          const email = this.registerForm.value.email;
          const password=this.registerForm.value.password;
          const tel = this.registerForm.value.tel;
          console.log("adresId: ", adresId);
          return this.apiServiceUSER.post(ad, soyad, email,password, tel, adresId);
        })
      ).subscribe({
        next: (res) => {
          this.toaster.success('Please contact admin for enable access', 'Registered Successfully');
          this.router.navigate(['home']);
        }
      });
    }
    else {
      this.toaster.warning('Please check your data! and enter valid data.');
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  isPasswordHintVisible(): boolean {
    const passwordControl = this.registerForm.get('password');
    return !!passwordControl?.invalid && (passwordControl.dirty || passwordControl.touched);
  }
  
}  
