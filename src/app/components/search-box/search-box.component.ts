import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  searchTerm: string = '';
  @Output() searchValueChanged = new EventEmitter<string>();



  ngOnInit() {

  }

  onSearch() {
    this.searchValueChanged.emit(this.searchTerm);
    console.log("searchboxtaki veri: ", this.searchTerm);
  }
}
