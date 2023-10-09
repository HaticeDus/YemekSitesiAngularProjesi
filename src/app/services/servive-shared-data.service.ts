import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiveSharedDataService {


  constructor() { }

  private kategoriID: any;

  async setKategoriID(kategoriID: any) {
    this.kategoriID = kategoriID;
  }

  async getKategoriID(): Promise<any> {
    return this.kategoriID;
  }

  private _restaurantIDs: any[] = [];

  async setRestaurantIDs(value: any[]) {
    this._restaurantIDs = value;
  }

  async getRestaurantIDs(): Promise<any[]> {
    return this._restaurantIDs;
  }


}
