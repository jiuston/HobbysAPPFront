import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TareaOutputDTO } from '../modelos/TareaOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class TareaService {



  baseTareaURL = "https://personalhobbys-app.herokuapp.com/tareas"

  constructor(private http: HttpClient) { }


  getTareasByHobbyId(id: string): Observable<HttpResponse<any>> {
    return this.http.get(this.baseTareaURL.concat(`/hobby?hobbyID=${id}`), { observe: "response" });
  }

  getTarea(id: string): Observable<HttpResponse<any>> {
    return this.http.get(this.baseTareaURL.concat(`?tareaID=${id}`), { observe: "response" });
  }

  addTareaToHobby(newTarea: TareaOutputDTO, hobbyID: string): Observable<HttpResponse<any>> {
    return this.http.post(this.baseTareaURL.concat(`/add?hobbyID=${hobbyID}`), newTarea, { observe: 'response' });
  }

  deleteTareaByID(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(this.baseTareaURL.concat(`/delete?tareaID=${id}`), { observe: 'response' });
  }

}
