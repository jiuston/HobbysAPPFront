import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginURL="https://jiuston-hobbys.westeurope.cloudapp.azure.com:8081/login";
  localBaseLoginURL = "https://localhost:8081/login";

  constructor(private http: HttpClient) { }


  login(user : any) : Observable<HttpResponse<any>>{
    return this.http.post(this.loginURL, user, {observe: 'response'});
  }


}
