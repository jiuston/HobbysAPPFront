import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioOutputDTO } from '../modelos/ComentarioOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {



  baseComentariosURL = "https://personalhobbys-app.herokuapp.com/comentarios"


  constructor(private http: HttpClient) { }

  getComentariosByTarea(tareaID: string): Observable<HttpResponse<any>> {
    return this.http.get(this.baseComentariosURL.concat(`/tarea/${tareaID}`), { observe: 'response' });
  }

  editComentario(newComentario: ComentarioOutputDTO, comentarioID: string): Observable<HttpResponse<any>> {
    return this.http.put(this.baseComentariosURL.concat(`?comentarioID=${comentarioID}&comentarioST=${newComentario.comentario}`), null, { observe: 'response' });
  }

  addComentario(tareaID: string, formData: FormData): Observable<HttpResponse<any>> {
    return this.http.post(this.baseComentariosURL.concat(`/add?tareaID=${tareaID}`), formData, { observe: 'response' });
  }
}
