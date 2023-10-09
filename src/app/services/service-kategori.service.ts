import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class ServiceKategoriService {

  private apiUrl = 'https://localhost:7037/api/Kategoriler_1/'; // API URL'sini buraya girin


  constructor(private http: HttpClient) { }

  // GET isteği için örnek bir metot
  public get(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }

  //////////////////////////////
  // POST isteği için örnek bir metot
  // public post(endpoint: string, data: any): Observable<any> {
  //   const url = `${this.apiUrl}/${endpoint}`;
  //   return this.http.post(url, data);
  // }

  // public post(data: any): Observable<any> {
  //   //console.log('data', data.kategoriTuru);

  //   const url = this.apiUrl + `Post?kategoriName=${data.kategoriTuru}`;
  //   //console.log('url', url);

  //   return this.http.post(url, data);
  // }

  // public post(data: any): Observable<any> {
  //   return this.http.post('https://localhost:7037/api/Kategoriler_1/',data);
  // }

  //////////////////////////////
  // https://localhost:7037/api/Kategoriler_1?kategoriName=deneme2
  //https://localhost:7037/api/Kategoriler_1/Post?kategoriName=deneme4
  //////////////////////////////
  // public post(data: any): Observable<any> {
  //   return this.http.post('https://localhost:7037/api/Kategoriler_1/Post?kategoriName=',data);
  // }
  //////////////////////////////
  // public post(data: any): Observable<any> {
  //   const url = ' https://localhost:7037/api/Kategoriler_1/Post';
  //   return this.http.post(url,data);
  // }
  //////////////////////////////
  // public post(data: any): Observable<any> {
  //   const url = `https://localhost:7037/api/Kategoriler_1/Post?kategoriName=${data}`;
  //   return this.http.post(url, null);
  // }

  // public post(category: any): Observable<any> {
  //  // const url = `https://localhost:7037/api/Kategoriler_1?kategoriName=${data}`;
  //   return this.http.post(`https://localhost:7037/api/Kategoriler_1/`, category);
  // }


 //POST
  public post(kategoriName: any): Observable<any> {

    const url = this.apiUrl+`?kategoriName=${kategoriName}` ;
    console.log('------service kısmı------')
    console.log('kategoriTuru:', kategoriName);
    console.log('url: ', url);
    return this.http.post(url, null);
  }



  // PUT isteği için örnek bir metot

  //////////////////////////////
  public put(id: number, data: any): Observable<any> {
    // const url = `${this.apiUrl}/${endpoint}`;
    // return this.http.put(url, data);
    return this.http.put('https://localhost:7037/api/Kategoriler_1/' + id, data);
  }
  //////////////////////////////
  // DELETE isteği için örnek bir metot
  public delete(id: number): Observable<any> {
    const endpoint = id;
    // const url = `${this.apiUrl}/${endpoint}`;
    //return this.http.delete(url);
    //return this.http.delete(this.apiUrl + "/" + id)
    //https://localhost:7037/api/Kategoriler_1/507
    return this.http.delete('https://localhost:7037/api/Kategoriler_1/' + id);
  }

}
