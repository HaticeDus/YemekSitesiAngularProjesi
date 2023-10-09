import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServiceRestMenuService } from 'src/app/services/service-rest-menu.service';
import { ServiceRestaurantService } from 'src/app/services/service-restaurant.service';
import { ServiceMenuService } from 'src/app/services/service-menu.service';
import { rest_menuModel } from 'src/app/models/rest_menuModel';
import { restaurantModel } from 'src/app/models/restaurantModel';
import { menuModel } from 'src/app/models/menuModel';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-rest-menu',
  templateUrl: './rest-menu.component.html',
  styleUrls: ['./rest-menu.component.css']
})

export class RestMenuComponent {


  rest_restmenu_mergeList: any[] = [];

  restList: restaurantModel[] = [];
  restmenuList: rest_menuModel[] = [];
  menuList: menuModel[] = [];


  displayedColumns = ['restMenuID', 'restaurantAd', 'menuAdi'];
  dataSource = this.rest_restmenu_mergeList;

  constructor(
    private apiServiceREST: ServiceRestaurantService,
    private apiServiceRESTMENU: ServiceRestMenuService,
    private apiServiceMENU: ServiceMenuService) { }

  ngOnInit(): void {
    forkJoin([
      this.apiServiceREST.get(),
      this.apiServiceRESTMENU.get(),
      this.apiServiceMENU.get()
    ]).subscribe(
      ([rests, restmenus, menus]) => {
        this.restList = rests;
        this.restmenuList = restmenus;
        this.menuList = menus;
        this.getMerge_RestMenu(); // diziyi çağırdım
        console.log("this.restList: ", this.restList);
        console.log("this.restmenuList: ", this.restmenuList);
        console.log("this.menuList: ", this.menuList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }//ngOnInit end 

  getMerge_RestMenu() { //rest_restmenu_mergeList dizi oluşturma işlemi
    this.rest_restmenu_mergeList = this.restmenuList.map(restmenu => {
      const rest = this.restList.find(rest => rest.restaurantID === restmenu.restaurantID);
      const menu = this.menuList.find(menu => menu.menuID === restmenu.menuID);

      return {
        restMenuID: restmenu.restMenuID,
        // restaurantID: rest ? rest.restaurantID : null, // boş gelirse null ata(ternary ifade)
        // menuID: menu ? menu.menuID : null ,
        restaurantAd: rest ? rest.restaurantAd : '',  //boş gelirse
        menuAdi: menu ? menu.menuAdi : '' //boş gelirse
      };
    });
    console.log("rest_restmenu_mergeList: ", this.rest_restmenu_mergeList);
  }

}
