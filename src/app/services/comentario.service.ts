import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioOutputDTO } from '../modelos/ComentarioOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {


  baseComentariosURL = "https://jiuston-hobbys.westeurope.cloudapp.azure.com:8081/comentarios"
  localBaseComentariosURL = "https://localhost:8081/comentarios";


  constructor(private http: HttpClient) { }

  getComentariosByTarea(tareaID: string): Observable<HttpResponse<any>> {
    return this.http.get(this.localBaseComentariosURL.concat(`/tarea/${tareaID}`), { observe: 'response' });
  }

  editComentario(newComentario: ComentarioOutputDTO, formData: FormData,comentarioID: string): Observable<HttpResponse<any>> {
    return this.http.put(this.localBaseComentariosURL.concat(`?comentarioID=${comentarioID}&comentarioST=${newComentario.comentario}`), formData, { observe: 'response' });
  }

  addComentario(tareaID: string, formData: FormData): Observable<HttpResponse<any>> {
    return this.http.post(this.localBaseComentariosURL.concat(`/add?tareaID=${tareaID}`), formData, { observe: 'response' });
  }

  deleteComentarioByID(id: string): Observable<HttpResponse<any>> {
   return this.http.delete(this.localBaseComentariosURL.concat(`?comentarioID=${id}`), {observe: `response`});
  }

}
