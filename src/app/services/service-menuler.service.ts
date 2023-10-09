import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceMenulerService {

  private apiUrl = 'https://localhost:7037/api/Menuler_1'; // API URL'sini buraya girin

  constructor(private http: HttpClient) { }

  //GET
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }


  //POST
  //https://localhost:7037/api/Menuler_1?Menuid=703&Urunid=912

  public post(menuID: any, urunID: any): Observable<any> {

    console.log('-----service kısmı------')

    const url = this.apiUrl + `?Menuid=${menuID}&Urunid=${urunID}`;
    console.log('url: ', url);
    return this.http.post(url, null);
  }

  //PUT 
  //https://localhost:7037/api/Menuler_1/802

  public put(id: number, data: any): Observable<any> {
    const url = this.apiUrl + '/' + id;
    console.log('-----service kısmı------')
    console.log("data:", data)
    return this.http.put(url, data);
  }


  //DELETE
  public delete(id: number): Observable<any> {
    const url = this.apiUrl + '/' + id;
    console.log('-----menüler service kısmı------')
    console.log("id: ",id)
    console.log('delete-menuler-url:  ', url);
    return this.http.delete(url);
  }
}
