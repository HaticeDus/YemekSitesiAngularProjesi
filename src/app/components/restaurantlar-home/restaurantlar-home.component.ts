import { Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ServiceKategoriService } from 'src/app/services/service-kategori.service';
import { ServiceRestaurantService } from 'src/app/services/service-restaurant.service';
import { restaurantModel } from 'src/app/models/restaurantModel';
import { ServiveSharedDataService } from 'src/app/services/servive-shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantlar-home',
  templateUrl: './restaurantlar-home.component.html',
  styleUrls: ['./restaurantlar-home.component.css']
})

export class RestaurantlarHomeComponent implements AfterViewInit, OnChanges {

  //@Output() cardClicked: EventEmitter<any> = new EventEmitter(); //veriyi göndermek için
  //restaurantId'yi menüler-home componentine göndermek için

  //@Input() selectedRestaurantID: any; // gelen veriyi almak için 
  //kategori-home'dan kategoriId alındı

  restList: restaurantModel[] = [];
  newRestList: any[] = [];
  List: any[] = [];

  @Input() public restaurantIDs: any[] = [];//home'dan gelen restauranID'leri
  //restaurantIDs: any[] = [];

  constructor(
    private apiServiceREST: ServiceRestaurantService,
    private sharedDataService: ServiveSharedDataService,
    private router: Router

  ) { }


  // ngOnInit(): void {
  //   //this.getSelectedRestaurantID();
  //   this.getItems();
  // }//ngOnInit end 


  ngAfterViewInit(): void { //bileşenin görünümü oluşturulduğunda ve bileşenin @Input() verileri doldurulduğunda çağrılır.
    this.getRestList();

  }

  // async getSelectedRestaurantID() {
  //   this.SelectedRestaurantID = await this.sharedDataService.getrestaurantID();
  //   console.log("gelen SelectedRestaurantID: ", this.SelectedRestaurantID);
  // }

  async getRestList(): Promise<void> {
    try {
      const response: any = await this.apiServiceREST.get().toPromise();
      this.restList = response;
      // console.log(this.restList);
      this.List = this.restList;
    } catch (error) {
      console.error(error);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {

    //this.getRestList();

    if (changes['restaurantIDs'] && !changes['restaurantIDs'].firstChange) { //ilk değişiklik anında, yani sayfa yüklendiğinde veya 
      //bileşenin ilk defa çalıştırıldığı an dışında console.log'u çağırır.
      this.restaurantIDs = changes['restaurantIDs'].currentValue;

      const notNullandDuplicateRestaurantIDs = this.restaurantIDs.filter((id, index, array) => {
        return id !== null && array.indexOf(id) === index;
      });//aynı ve null olmayan değerleri al

      console.log("notNullandDuplicateRestaurantIDs: ", notNullandDuplicateRestaurantIDs);
      console.log("home componentden gelen restaurantIDs", this.restaurantIDs);

      this.newRestList = notNullandDuplicateRestaurantIDs.map(id =>
        this.restList.find(restaurant => restaurant.restaurantID === id)
      );
      console.log("newRestList: ", this.newRestList);
      this.List = this.newRestList;
      console.log(" this.List: ", this.List);
    }
  }



  // getItems(): void {
  //   this.apiServiceREST.get().subscribe(
  //     (response: any) => {
  //       this.restList = response;
  //       // console.log(this.restList);
  //       this.List = this.restList;
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }







  // async getRestaurantIDs() {
  //   this.restaurantIDs = await this.sharedDataService.getRestaurantIDs();
  //   console.log("home componentden gelen restaurantIDs", this.restaurantIDs);
  // }


  // async getKategoriID() {
  //   this.selectedKategoriID = await this.sharedDataService.getKategoriID();
  //   console.log("gelen selectedKategoriID: ", this.selectedKategoriID);
  // }

  onCardClicked(restaurantID: any) {
    // this.cardClicked.emit(); // carda tıkladığımda restaurantID verisini gönderiyor
    this.router.navigate(['/restMenuShow', restaurantID]);
  }

}
