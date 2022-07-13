import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GastoOutputDTO } from '../modelos/GastoOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class GastoService {


  baseGastosURL = "https://personalhobbys-app.herokuapp.com/gastos"


  constructor(private http: HttpClient) { }

  getGastosByTarea(tareaID: string): Observable<HttpResponse<any>> {
    return this.http.get(this.baseGastosURL.concat(`/tarea/${tareaID}`), { observe: 'response' });
  }

  addGasto(tareaID: string, formData: FormData): Observable<HttpResponse<any>> {
    return this.http.post(this.baseGastosURL.concat(`/add?tareaID=${tareaID}`), formData, { observe: 'response' });
  }

  editGasto(formData: FormData, gastoID: string): Observable<HttpResponse<any>> {
    return this.http.put(this.baseGastosURL.concat(`?gastoID=${gastoID}`), formData, { observe: 'response' });
  }
  deleteGastoByID(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(this.baseGastosURL.concat(`?gastoID=${id}`), { observe: "response" });
  }

}
