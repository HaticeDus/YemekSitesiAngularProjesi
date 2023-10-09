import { Component } from '@angular/core';
import { ServiceMenuService } from 'src/app/services/service-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuList: any[] = [];

  displayedColumns = ['menuID', 'menuAdi', 'menuImg', 'delete'];
  dataSource = this.menuList;


  constructor(private apiService: ServiceMenuService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.apiService.get().subscribe(
      (response: any) => {
        this.menuList = response;
        console.log(this.menuList);
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
