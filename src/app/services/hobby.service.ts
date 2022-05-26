import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hobby } from '../modelos/hobby';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  basehobbysURL = "https://personalhobbys-app.herokuapp.com/hobbys";

  constructor(private http: HttpClient) { }

  getAllHobbys(): Observable<HttpResponse<any>> {
    return this.http.get(this.basehobbysURL.concat("/all"), { observe: 'response' });
  }

  getHobby(id: string): Observable<HttpResponse<any>> {
    return this.http.get(this.basehobbysURL.concat(`?id=${id}`), { observe: 'response' });
  }


}
