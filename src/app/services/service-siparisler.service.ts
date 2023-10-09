import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceSiparislerService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7037/api/Siparisler_1'; // API URL'sini buraya girin 
  // GET ++
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }

  //--------------------------------------------------
  //POST
   //https://localhost:7037/api/Siparisler_1?userid=203&urunid=903&menulerid=801&restid=403&sAdet=5&sTutar=632

  // public post(urunAdi: any, urunFiyat: number, data: any): Observable<any> {
    
  //   console.log('-----service kısmı------')
  //   console.log();

  //   const url = this.apiUrl + `?UrunAd= ${data.urunAdi}& UrunFiyat= ${data.urunFiyat}`;

  //   console.log('url: ', url);
  //   return this.http.post(url, null);
  // }

  // //--------------------------------------------------
  // //PUT
  // //https://localhost:7037/api/Siparisler_1/305

  // public put(id: number, data: any): Observable<any> {
  //   const url = this.apiUrl + '/' + id;
  //   return this.http.put(url, data);
  // }

  // //--------------------------------------------------
  // //DELETE++
  // public delete(id: number): Observable<any> {
  //   const url = this.apiUrl + '/' + id;
  //   return this.http.delete(url);
  // }
}
