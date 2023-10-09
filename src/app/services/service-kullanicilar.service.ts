import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceKullanicilarService {

  private apiUrl = ' https://localhost:7037/api/Kullanicilar_1'; // API URL'sini buraya girin

  constructor(private http: HttpClient) { }

  //GET
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }


  //POST
  //https://localhost:7037/api/Kullanicilar_1?Ad=Davut&Soyad=Akan&Email=dvdakan%40example.com&Tel=5563214785&adresID=105

  public post(userAd: any, userSoyad: any, userEmail: any, userPassword: any, userTel: any, userAdresId: any): Observable<any> {

    const url = this.apiUrl + `?Ad=${userAd}&Soyad=${userSoyad}&Email=${userEmail}&Password=${userPassword}&Tel=${userTel}&adresID=${userAdresId}`;

    console.log('------service kısmı------')
    console.log('',);
    console.log('post-kullanıcılar-url: ', url);

    return this.http.post(url, null);
  }


  //PUT
  //https://localhost:7037/api/Kullanicilar_1/206

  public put(id: number, data: any): Observable<any> {
    const url = this.apiUrl + '/' + id
    console.log('put-kullanıcılar- url: ', url);
    console.log('data: ', data);
    return this.http.put(url, data);
  }

  //DELETE 

  public delete(id: number): Observable<any> {
    const url = this.apiUrl + '/' + id;
    console.log('delete-kullanıcılar- url: ', url);
    return this.http.delete(url);
  }

  //GET BY ID
  //https://localhost:7037/api/Kullanicilar_1/205
  public getById(id: number): Observable<any> {
    const url = this.apiUrl + '/' + id;
    console.log("url :", url);
    return this.http.get(url);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('userID') != null;
  }

  GetUserRole() {
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }

}

