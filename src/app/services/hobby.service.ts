import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hobby } from '../modelos/hobby';
import { HobbyOutputDTO } from '../modelos/HobbyOutputDTO';

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

  addHobby(formData: FormData): Observable<HttpResponse<any>> {
    return this.http.post(this.basehobbysURL.concat("/add"), formData, { observe: 'response' });
  }

  deleteHobbyByID(hobbyID: string): Observable<HttpResponse<any>> {
    return this.http.delete(this.basehobbysURL.concat(`/delete/${hobbyID}`), { observe: 'response' });
  }

  editHobby(formData: FormData, hobbyID: string, deleteIMG: boolean): Observable<HttpResponse<any>> {
    return this.http.put(this.basehobbysURL.concat(`/edit/${hobbyID}?deleteIMG=${deleteIMG}`), formData, { observe: 'response' });
  }


}
