import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceSepetService {
  constructor() {}

  private sepetUrun: any[] = [];

  ekleUrun(urun: any) {
    this.sepetUrun.push(urun);
  }

  sepetUrunGetir() {
    //console.log(this.sepetUrun);
    return this.sepetUrun;
  }

  //---------------------------------------------------------------

  private sepetMenu: any[] = [];
  ekleMenu(menu: any) {
    this.sepetMenu.push(menu);
  }

  sepetMenuGetir() {
   // console.log(this.sepetMenu);
    return this.sepetMenu;
  }
}
