import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceRestaurantService {


  constructor(private http: HttpClient) { }


  private apiUrl = 'https://localhost:7037/api/Restaurant_1'; // API URL'sini buraya girin 


  // GET ++
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }

  //--------------------------------------------------
  //POST
  //https://localhost:7037/api/Restaurant_1?kategorid=500&restAdi=Pideci%20Ali%20Usta&restAdres=Ankara%2FBat%C4%B1kent&restTel=2125633355

  public post(restAdi: any, restAdres: any, restTel: any, restImg: any): Observable<any> {

    console.log('-----service kısmı------')
    console.log();
    console.log();

    //https://localhost:7037/api/Restaurant_1?restAdi=deneme&restAdres=deneme&restTel=1236548574&restImg=nkjnkjn

    const url = this.apiUrl + `?restAdi=${restAdi}&restAdres=${restAdres}&restTel=${restTel}&restImg=${restImg}`;

    console.log('url: ', url);
    return this.http.post(url, null);
  }


  //--------------------------------------------------
  //PUT
  //https://localhost:7037/api/Restaurant_1/405

  public put(id: number, data: any): Observable<any> {
    const url = this.apiUrl + '/' + id;
    return this.http.put(url, data);
  }


  //--------------------------------------------------
  //DELETE++
  //https://localhost:7037/api/Restaurant_1/406
  public delete(id: number): Observable<any> {
    const url = this.apiUrl + '/' + id;
    return this.http.delete(url);
  }
}
