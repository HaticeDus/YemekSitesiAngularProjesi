import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceKullanicilarService } from 'src/app/services/service-kullanicilar.service';
import { Router } from '@angular/router'; // yönlendirme işlemi
import { userModels } from 'src/app/models/userModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  userList: userModels[] = [];
  loginForm!: FormGroup;
  showPassword: boolean = false;
  formInitialized: boolean = false; // Form başlatıldı mı kontrolü


  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private apiServiceUSER: ServiceKullanicilarService,
  ) {
    //sessionStorage.clear();//login sayfasına geldiğimde hesap siliniyor
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  isPasswordHintVisible(): boolean {
    const passwordControl = this.loginForm.get('password');
    return !!passwordControl?.invalid && (passwordControl.dirty || passwordControl.touched);
  }


  ngOnInit(): void {
    this.initForm(); //asenkron olarak yapılabileceği olasılığına karşı kontrol
    // this.userLogin();

  }//ngOnInit end

  async initForm() {
    this.loginForm = this.formBuilder.group({
      userID: null,
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])],
      role: [''],
      isactive: true
    });

    this.formInitialized = true; // Form başlatıldı

  }



  userLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.apiServiceUSER.get().subscribe(res => {
      this.userList = res;
      // console.log("this.userList: ", this.userList);

      // Kullanıcı listesinde email ve password ile eşleşen bir kullanıcı var mı kontrol ediyoruz
      const findUser = this.userList.find((user) => user.email === email && user.password === password);// gelen kullanıcının nesnesi

      //console.log("findUser: ", findUser);

      if (findUser) {
        console.log("findUser.isactive :", findUser.isactive);
        if (findUser.isactive) {
          this.toaster.success('HOŞGELDİN !' + "     " + findUser.ad.toUpperCase() + "     " + findUser.soyad.toUpperCase(), 'GİRİŞ BAŞARILI');
          sessionStorage.setItem('userID', findUser.userID.toString());
          //sessionStorage.setItem('role', findUser.role);

          // JSON dizesine dönüştür ve localStorage'e kaydet
          localStorage.setItem('loggedInUser', JSON.stringify(findUser));

          // Toast kutucuğunu görüntüledikten 2 saniye sonra anasayfaya yönlendir
          setTimeout(() => {
            this.router.navigate(['home']).then(() => {
              window.location.reload(); // Sayfayı yenileyerek home sayfasına yönlendir
            });
          }, 1000); // 1 saniye (1000 milisaniye) bekleyecek
        }
        else {
          this.toaster.error('Please contact admin', 'InActive User');
        }
      }
      else {
        this.toaster.warning('Böyle Bir Hesap Bulunamadı!')
      }
    }, (error) => {
      console.log("API çağrısı sırasında bir hata oluştu:", error);
    });
  }
}
