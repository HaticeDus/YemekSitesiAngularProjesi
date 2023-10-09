import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceAdresService {

  private apiUrl = 'https://localhost:7037/api/Adres_1'; // API URL'sini buraya girin

  constructor(private http: HttpClient) { }

  //GET
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }



  //POST
  //https://localhost:7037/api/Adres_1?isAdres=Ankara&evAdres=%C4%B0stanbul

  public post(userIsAdres: any, userEvAdres: any): Observable<any> {

    const url = this.apiUrl + `?isAdres=${userIsAdres}&evAdres=${userEvAdres}`;

    console.log('------service kısmı------')
    // console.log('',);
    console.log('url: ', url);

    return this.http.post(url, null);
  }

  //PUT
  //https://localhost:7037/api/Adres_1/112

  public put(id: number, data: any): Observable<any> {
    const url=this.apiUrl + '/' + id;
    console.log('put-adres-url: ', url);
    return this.http.put(url, data);
  }

  //DELETE
  public delete(id: number): Observable<any> {
    const url=this.apiUrl + '/' + id;
    console.log('delete-adres- url:  ', url);
    return this.http.delete(url);
  }


}
