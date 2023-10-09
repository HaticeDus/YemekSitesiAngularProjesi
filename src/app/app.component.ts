import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { userModels } from './models/userModel';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Yemek Sitesi Angular Projesi';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  //isMenuRequired=false;
  findUser: userModels | undefined; // Kullanıcı bilgilerini tutacak değişken
  loggedIn: boolean = false; // Kullanıcının giriş durumunu tutacak değişken
  restaurant: any;
  person: any;
  admin: any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.getDataStorage();
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open('Çıkış Yapmak İstediğinize Emin misiniz?', 'Çıkış Yap', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000, // Snackbar'ın görüntülenme süresi (ms cinsinden)
      panelClass: ['logout-snackbar'], // Özel sınıf adı
    });

    snackBarRef.onAction().subscribe(() => {
      this.logout(); // Bildirim kutusunda "Çıkış Yap" düğmesine tıklandığında logout() yöntemini çağır
    });
  }

  // Çıkış yap ve sessionStorage'ı temizle
  logout() {
    this.findUser = undefined; // Kullanıcı verisini sıfırla
    sessionStorage.clear(); // SessionStorage'ı temizle
    localStorage.removeItem('loggedInUser'); // localStorage'deki veriyi sil
    this.loggedIn = false; // Kullanıcı giriş yapmamış olarak işaretlenir
    this.router.navigate(['/home']); // Anasayfaya yönlendir
    window.location.reload(); //çıkış yap sayfayı yenile
  }

  // Özyinelemeli olarak localStorage'den veriyi al
  async getDataStorage() {
    const loggedInUser = await this.getLoggedInUser();
    if (loggedInUser) {
      this.loggedIn = true; // Kullanıcı giriş yapmış olarak işaretlenir
      this.findUser = JSON.parse(loggedInUser);
      if (this.findUser?.role == "admin") {
        this.admin = true;
      }
      else if (this.findUser?.role == "person") {
        this.person = true;
      }
      else {
        this.restaurant = true;
      }
    }
  }

  // localStorage'den veriyi almak için promisified bir fonksiyon
  private getLoggedInUser(): Promise<string | null> {
    return new Promise((resolve) => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      resolve(loggedInUser);
    });
  }

  goToHome() {
    window.location.href = "http://localhost:4200/home";
  }

}

 // ngDoCheck():void{
  //   let currenturl=this.router.url;
  //   if(currenturl=='/login'||currenturl=='/register'||currenturl=='/home'){
  //     this.isMenuRequired=false;
  //   }else{
  //     this.isMenuRequired=true;
  //   }
  // }