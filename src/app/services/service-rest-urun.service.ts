import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceRestUrunService {


  //https://localhost:7037/api/Restaurant_Urun_1

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7037/api/Restaurant_Urun_1'; // API URL'sini buraya girin 


  // GET ++
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }


  //DELETE
  public delete(id: number): Observable<any> {
    const url = this.apiUrl + '/' + id;
    return this.http.delete(url);
  }
}
