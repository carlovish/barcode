import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient,
    //private dataService: DataService,
  ) { }

  sendHttpCall(data: any = '', url: any, method: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'aplication/json',
      })
    };

    switch(method){
      case 'post':
        return this.http.post<any>(environment.apiUrl + url, (data), httpOptions );

      case 'get':
        return this.http.get<any>(environment.apiUrl + url, httpOptions);

    }
  }
}
