import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceMenuService {

  private apiUrl = 'https://localhost:7037/api/Menu_1'; // API URL'sini buraya girin

  constructor(private http: HttpClient) { }

  //GET
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }

   //POST
  //https://localhost:7037/api/Menu_1?MenuAdi=Tatl%C4%B1%20R%C3%BCyas%C4%B1

  public post(MenuAdi: any): Observable<any> {

    const url = this.apiUrl + `?MenuAdi=${MenuAdi}`;

    console.log('------service kısmı------')
    // console.log('',);
    console.log('post-menu- url: ', url);

    return this.http.post(url, null);
  }

  //PUT
  //https://localhost:7037/api/Menu_1/706

  public put(id: number, data: any): Observable<any> {
    const url=this.apiUrl + '/' + id;
    console.log('put-menu-url: ', url);
    return this.http.put(url, data);
  }

  //DELETE //silmek istersen ekle 
  public delete(id: number): Observable<any> {
    const url=this.apiUrl + '/' + id;
    console.log('delete-menu- url:  ', url);
    return this.http.delete(url);
  }

}
