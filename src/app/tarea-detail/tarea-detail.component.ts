import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GastoInputDTO } from '../modelos/GastoInputDTO';
import { TareaInputDTO } from '../modelos/TareaInputDTO';
import { GastoService } from '../services/gasto.service';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-tarea-detail',
  templateUrl: './tarea-detail.component.html',
  styleUrls: ['./tarea-detail.component.css']
})
export class TareaDetailComponent implements OnInit {

  hobbyID: string = '';
  tarea: TareaInputDTO = new TareaInputDTO();
  tareaID?: string;
  gastos: GastoInputDTO[] = [];

  constructor(private tareaService: TareaService, private router: Router, private gastoService: GastoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tareaID = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.tareaService.getTarea(this.tareaID).subscribe(data => this.setParams(data));
    this.gastoService.getGastosByTarea(this.tareaID).subscribe(data => this.gastos = data.body)
  }

  setParams(data: any) {
    this.tarea = data.body;
    this.hobbyID = this.tarea.hobbyID;
  }

  openIMG(url: string) {
    window.open(url);
  }

  procesarRespuesta(data: HttpResponse<any>): void {
    if (data && data.status === 200) {
      this.router.navigateByUrl(`/hobbys/${this.hobbyID}/view`);
    }
  }

  delete() {
    Swal.fire({
      title: 'Borrar la tarea ' + this.tarea.titulo,
      text: "Si se borra la tarea tambien se eliminarán los comentarios y gastos asociados.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tareaService.deleteTareaByID(this.tareaID!).subscribe(data => this.procesarRespuesta(data));
      }
    })
  }
}
