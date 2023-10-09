import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceRestMenuService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7037/api/Restaurant_Menu_1'; // API URL'sini buraya girin 


  // GET ++
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }
}
