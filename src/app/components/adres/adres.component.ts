import { Component, OnInit } from '@angular/core';
import { ServiceAdresService } from 'src/app/services/service-adres.service';


@Component({
  selector: 'app-adres',
  templateUrl: './adres.component.html',
  styleUrls: ['./adres.component.css']
})
export class AdresComponent implements OnInit {

  adresList: any[] = [];

  displayedColumns = ['adresID', 'evAdresi', 'isAdresi','delete'];
  dataSource = this.adresList;

  
  constructor(private apiService: ServiceAdresService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.apiService.get().subscribe(
      (response: any) => {
        this.adresList = response;
        //console.log(this.kategorilerList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteItems(id: number): void {//+
    this.apiService.delete(id).subscribe({
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
