import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ServiceKullanicilarService } from '../services/service-kullanicilar.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private kullanicilarService: ServiceKullanicilarService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    //canActivate: [AuthGuard]
    //belirli rotalara erişim izinlerini kontrol etmek, kullanıcıları belirli koşullara 
    //göre yönlendirmek veya rotalara erişim hakkını engellemek gibi işlemleri gerçekleştirir
    // Kimlik doğrulama mantığınızı burada uygulayın
    if (this.kullanicilarService.IsLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/home']);
      return false;
    }


  }
}
