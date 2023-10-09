import { Component, OnInit } from '@angular/core';
import { ServiceSiparislerService } from 'src/app/services/service-siparisler.service';

@Component({
  selector: 'app-siparisler',
  templateUrl: './siparisler.component.html',
  styleUrls: ['./siparisler.component.css']
})
export class SiparislerComponent {

  siparisList: any[] = [];

  displayedColumns = ['siparisID', 'userID', 'urunID', 'menulerID', 'restaurantID', 'siparisTarih', 'siparisAdet', 'siparisTutar'];
  dataSource = this.siparisList;

  constructor(private apiService: ServiceSiparislerService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.apiService.get().subscribe(
      (response: any) => {
        this.siparisList = response;
        console.log(this.siparisList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  //   deleteItems(id: number): void {//+
  //     this.apiService.delete(id).subscribe({
  //       next: (res) => {
  //         alert("item Deleted Succesfully");
  //         this.getItems();
  //       },
  //       error: () => {
  //         alert("Error while deleting the item!");
  //       }
  //     })
  // }
}
