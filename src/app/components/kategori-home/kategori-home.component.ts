import { Component, Output, EventEmitter } from '@angular/core';
import { ServiceKategoriService } from 'src/app/services/service-kategori.service';
import { kategorilerModel } from 'src/app/models/kategorilerModel';
import { Router } from '@angular/router';
import { ServiveSharedDataService } from 'src/app/services/servive-shared-data.service';


@Component({
  selector: 'app-kategori-home',
  templateUrl: './kategori-home.component.html',
  styleUrls: ['./kategori-home.component.css']
})

export class KategoriHomeComponent {

  @Output() cardClicked: EventEmitter<any> = new EventEmitter(); //veriyi göndermek için

  kategorilerList: kategorilerModel[] = [];

  constructor(
    private apiService: ServiceKategoriService,
    private sharedDataService: ServiveSharedDataService,
    private router: Router) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.apiService.get().subscribe(
      (response: any) => {
        this.kategorilerList = response;
        //console.log(this.kategorilerList);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onCardClicked(kategoriID: any) {
    this.cardClicked.emit(kategoriID); // carda tıkladığımda kategoriID verisini gönderiyor
    // this.sharedDataService.setKategoriID(kategoriID);//kategoriID bilgigsi service ile gönderilecek
    console.log("gönderilecek kategoriID: ", kategoriID);
  }
}
