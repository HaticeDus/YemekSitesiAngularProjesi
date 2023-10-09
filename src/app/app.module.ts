import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { KullanicilarComponent } from './components/kullanicilar/kullanicilar.component';
import { SiparislerComponent } from './components/siparisler/siparisler.component';
import { MenulerComponent } from './components/menuler/menuler.component';
import { UrunlerComponent } from './components/urunler/urunler.component';
import { RestaurantlarComponent } from './components/restaurantlar/restaurantlar.component';
import { KategorilerComponent } from './components/kategoriler/kategoriler.component';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { KategoriUpdateComponent } from './components/kategori-update/kategori-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { KategoriAddComponent } from './components/kategori-add/kategori-add.component';
import { UrunlerUpdateComponent } from './components/urunler-update/urunler-update.component';
import { UrunlerAddComponent } from './components/urunler-add/urunler-add.component';
import { KullanicilarAddComponent } from './components/kullanicilar-add/kullanicilar-add.component';
import { KullanicilarUpdateComponent } from './components/kullanicilar-update/kullanicilar-update.component';
import { AdresComponent } from './components/adres/adres.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenulerAddComponent } from './components/menuler-add/menuler-add.component';
import { MenulerUpdateComponent } from './components/menuler-update/menuler-update.component';
import { RestaurantlarAddComponent } from './components/restaurantlar-add/restaurantlar-add.component';
import { RestaurantlarUpdateComponent } from './components/restaurantlar-update/restaurantlar-update.component';
import { RestMenuComponent } from './components/rest-menu/rest-menu.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MenulerHomeComponent } from './components/menuler-urunler/menuler-urunler.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthGuard } from './guard/auth.guard';
import { MatStepperModule } from '@angular/material/stepper';
import { SepetComponent } from './components/sepet/sepet.component';
import { RestaurantlarHomeComponent } from './components/restaurantlar-home/restaurantlar-home.component';
import { KategoriHomeComponent } from './components/kategori-home/kategori-home.component';
import { register } from 'swiper/element/bundle';
register();// register Swiper custom elements
import { MenulerDashboardComponent } from './components/menuler-dashboard/menuler-dashboard.component';// import function to register Swiper custom elements
import { LayoutModule } from '@angular/cdk/layout';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { RestUrunComponent } from './components/rest-urun/rest-urun.component';
import { RestaurantMenuShowComponent } from './components/restaurant-menu-show/restaurant-menu-show.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    KullanicilarComponent,
    SiparislerComponent,
    MenulerComponent,
    UrunlerComponent,
    RestaurantlarComponent,
    KategorilerComponent,
    HomeComponent,
    KategoriUpdateComponent,
    KategoriAddComponent,
    UrunlerUpdateComponent,
    UrunlerAddComponent,
    KullanicilarAddComponent,
    KullanicilarUpdateComponent,
    AdresComponent,
    MenuComponent,
    MenulerAddComponent,
    MenulerUpdateComponent,
    RestaurantlarAddComponent,
    RestaurantlarUpdateComponent,
    RestMenuComponent,
    MenulerHomeComponent,
    RegisterComponent,
    LoginComponent,
    SepetComponent,
    RestaurantlarHomeComponent,
    KategoriHomeComponent,
    MenulerDashboardComponent,
    SearchBoxComponent,
    RestUrunComponent,
    RestaurantMenuShowComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    ToastrModule.forRoot(),
    MatProgressBarModule,
    MatStepperModule,
    LayoutModule

  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, // AuthGuard'ı sağlayıcılara ekleyin
  { provide: MatDialogRef, useValue: {} }
    , [AuthGuard]
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
