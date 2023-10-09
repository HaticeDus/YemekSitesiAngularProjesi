import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceUrunlerService {


  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7037/api/Urunler_1'; // API URL'sini buraya girin 
  // GET ++
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }

  //--------------------------------------------------
  //POST
  public post(urunAdi: any, urunFiyat: number, urunImg: any): Observable<any> {

    console.log('-----service kısmı------')
    console.log('data.urunAdi:', urunAdi);
    console.log('urunFiyat:', urunFiyat);

    const url = this.apiUrl + `?UrunAd= ${urunAdi}& UrunFiyat= ${urunFiyat}&UrunResim=${urunImg}`;

    console.log('url: ', url);
    return this.http.post(url, null);
  }

  //--------------------------------------------------
  //PUT

  public put(id: number, data: any): Observable<any> {
    const url = this.apiUrl + '/' + id;
    return this.http.put(url, data);
  }

  //--------------------------------------------------
  //DELETE++
  public delete(id: number): Observable<any> {
    const url = this.apiUrl + '/' + id;
    return this.http.delete(url);
  }

}
