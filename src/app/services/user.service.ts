import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginURL="http://localhost:8081/login";

  constructor(private http: HttpClient) { }


  login(user : any) : Observable<HttpResponse<any>>{
    return this.http.post(this.loginURL, user, {observe: 'response'});
  }


}
