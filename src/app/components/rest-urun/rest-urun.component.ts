import { Component } from '@angular/core';
import { ServiceRestUrunService } from 'src/app/services/service-rest-urun.service';
import { rest_urunModel } from 'src/app/models/rest_urunModel';

@Component({
  selector: 'app-rest-urun',
  templateUrl: './rest-urun.component.html',
  styleUrls: ['./rest-urun.component.css']
})
export class RestUrunComponent {

  restUrunList: rest_urunModel[] = [];


  displayedColumns = ['restUrunID', 'restaurantID', 'urunID'];
  dataSource = this.restUrunList;

  constructor(
    private apiServiceRESTURUN: ServiceRestUrunService
  ) { }

  ngOnInit() {
    this.getItems();
  }


  getItems(): void {
    this.apiServiceRESTURUN.get().subscribe(
      (response: any) => {
        this.restUrunList = response;
        console.log(this.restUrunList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteItems(id: number): void {//+
    this.apiServiceRESTURUN.delete(id).subscribe({
      next: (res) => {
        alert("item Deleted Succesfully");
        this.getItems();
      },
      error: () => {
        alert("Error while deleting the item!");
      }
    })
  }

}
