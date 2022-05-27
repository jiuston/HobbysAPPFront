import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  baseGastosURL = "https://personalhobbys-app.herokuapp.com/gastos"


  constructor(private http: HttpClient) { }

  getGastosByTarea(tareaID: string): Observable<HttpResponse<any>> {
    return this.http.get(this.baseGastosURL.concat(`/tarea/${tareaID}`), { observe: 'response' });
  }


}
