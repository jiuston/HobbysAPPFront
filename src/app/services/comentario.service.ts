import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioOutputDTO } from '../modelos/ComentarioOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {


  baseComentariosURL = "http://hobbysApp:8080/comentarios"


  constructor(private http: HttpClient) { }

  getComentariosByTarea(tareaID: string): Observable<HttpResponse<any>> {
    return this.http.get(this.baseComentariosURL.concat(`/tarea/${tareaID}`), { observe: 'response' });
  }

  editComentario(newComentario: ComentarioOutputDTO, formData: FormData,comentarioID: string): Observable<HttpResponse<any>> {
    return this.http.put(this.baseComentariosURL.concat(`?comentarioID=${comentarioID}&comentarioST=${newComentario.comentario}`), formData, { observe: 'response' });
  }

  addComentario(tareaID: string, formData: FormData): Observable<HttpResponse<any>> {
    return this.http.post(this.baseComentariosURL.concat(`/add?tareaID=${tareaID}`), formData, { observe: 'response' });
  }

  deleteComentarioByID(id: string): Observable<HttpResponse<any>> {
   return this.http.delete(this.baseComentariosURL.concat(`?comentarioID=${id}`), {observe: `response`});
  }

}
