import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TareaOutputDTO } from '../modelos/TareaOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  baseTareaURL = "https://jiuston-hobbys.westeurope.cloudapp.azure.com:8081/tareas";
  localBaseTareasURL = "https://localhost:8081/tareas";

  constructor(private http: HttpClient) { }


  getTareasByHobbyId(id: string): Observable<HttpResponse<any>> {
    return this.http.get(this.baseTareaURL.concat(`/hobby?hobbyID=${id}`), { observe: "response" });
  }

  getTareasByState(estado: string) : Observable<HttpResponse<any>> {
    return this.http.get(this.baseTareaURL.concat(`?estado=${estado}`), { observe: "response" });
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

  editTarea(newTarea: TareaOutputDTO, tareaID: string): Observable<HttpResponse<any>> {
    return this.http.put(this.baseTareaURL.concat(`/edit/${tareaID}`), newTarea, { observe: 'response' });
  }

}
