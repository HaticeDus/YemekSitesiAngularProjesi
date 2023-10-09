import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KullanicilarComponent } from './components/kullanicilar/kullanicilar.component';
import { SiparislerComponent } from './components/siparisler/siparisler.component';
import { MenulerComponent } from './components/menuler/menuler.component';
import { UrunlerComponent } from './components/urunler/urunler.component';
import { RestaurantlarComponent } from './components/restaurantlar/restaurantlar.component';
import { KategorilerComponent } from './components/kategoriler/kategoriler.component';
import { AdresComponent } from './components/adres/adres.component';
import { MenuComponent } from './components/menu/menu.component';
import { RestMenuComponent } from './components/rest-menu/rest-menu.component';
import { MenulerHomeComponent } from './components/menuler-urunler/menuler-urunler.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { KategoriHomeComponent } from './components/kategori-home/kategori-home.component';
import { RestaurantlarHomeComponent } from './components/restaurantlar-home/restaurantlar-home.component';
import { RestUrunComponent } from './components/rest-urun/rest-urun.component';
import { MenulerDashboardComponent } from './components/menuler-dashboard/menuler-dashboard.component';
import { RestaurantMenuShowComponent } from './components/restaurant-menu-show/restaurant-menu-show.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  //canActivate: [AuthGuard]
  //belirli rotalara erişim izinlerini kontrol etmek, kullanıcıları belirli koşullara 
  //göre yönlendirmek veya rotalara erişim hakkını engellemek gibi işlemleri gerçekleştirir
  { path: 'kullanicilar', component: KullanicilarComponent, canActivate: [AuthGuard] },
  { path: 'siparisler', component: SiparislerComponent, canActivate: [AuthGuard] },
  { path: 'urunler', component: UrunlerComponent, canActivate: [AuthGuard] },// Kategori ID'si parametre olarak geçiriliyor (/:kategoriID)->route parameters
  { path: 'restaurantlar', component: RestaurantlarComponent, canActivate: [AuthGuard] },
  { path: 'restaurantlarhome', component: RestaurantlarHomeComponent, canActivate: [AuthGuard] },
  { path: 'kategoriler', component: KategorilerComponent, canActivate: [AuthGuard] },
  { path: 'kategorilerhome', component: KategoriHomeComponent, canActivate: [AuthGuard] },
  { path: 'adres', component: AdresComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'restmenu', component: RestMenuComponent, canActivate: [AuthGuard] },
  { path: 'resturun', component: RestUrunComponent, canActivate: [AuthGuard] },
  { path: 'restMenuShow/:restaurantID', component: RestaurantMenuShowComponent },// herhangi bir kullanıcı görebilir.
  { path: 'menulerurunler', component: MenulerHomeComponent, canActivate: [AuthGuard] },
  { path: 'menulerdashboard', component: MenulerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'menuler', component: MenulerComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
