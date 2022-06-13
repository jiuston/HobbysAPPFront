import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  baseComentariosURL = "https://personalhobbys-app.herokuapp.com/comentarios"


  constructor(private http: HttpClient) { }

  getComentariosByTarea(tareaID: string): Observable<HttpResponse<any>> {
    return this.http.get(this.baseComentariosURL.concat(`/tarea/${tareaID}`), { observe: 'response' });
  }

}
