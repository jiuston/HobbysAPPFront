import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hobby } from '../modelos/hobby';
import { HobbyOutputDTO } from '../modelos/HobbyOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {




  basehobbysURL = "https://jiuston-hobbys.westeurope.cloudapp.azure.com:8081/hobbys";
  localBasehobbysURL = "https://localhost:8081/hobbys";

  constructor(private http: HttpClient) { }

  getAllHobbys(): Observable<HttpResponse<any>> {
    return this.http.get(this.localBasehobbysURL.concat("/all"), { observe: 'response' });
  }

  getHobby(id: string): Observable<HttpResponse<any>> {
    return this.http.get(this.localBasehobbysURL.concat(`?id=${id}`), { observe: 'response' });
  }

  addHobby(formData: FormData): Observable<HttpResponse<any>> {
    return this.http.post(this.localBasehobbysURL.concat("/add"), formData, { observe: 'response' });
  }

  deleteHobbyByID(hobbyID: string): Observable<HttpResponse<any>> {
    return this.http.delete(this.localBasehobbysURL.concat(`/delete/${hobbyID}`), { observe: 'response' });
  }

  editHobby(formData: FormData, hobbyID: string, deleteIMG: boolean): Observable<HttpResponse<any>> {
    return this.http.put(this.localBasehobbysURL.concat(`/edit/${hobbyID}?deleteIMG=${deleteIMG}`), formData, { observe: 'response' });
  }


}
