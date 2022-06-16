import { ComentarioDialogComponent } from './../comentario-dialog/comentario-dialog.component';
import { ComentarioOutputDTO } from './../modelos/ComentarioOutputDTO';
import { TareaOutputDTO } from './../modelos/TareaOutputDTO';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GastoInputDTO } from '../modelos/GastoInputDTO';
import { TareaInputDTO } from '../modelos/TareaInputDTO';
import { GastoService } from '../services/gasto.service';
import { TareaService } from '../services/tarea.service';
import { TareaDialogOverviewComponent } from '../tarea-dialog-overview/tarea-dialog-overview.component';
import { ComentarioInputDTO } from '../modelos/ComentarioInputDTO';
import { ComentarioService } from '../services/comentario.service';
import { GastoOutputDTO } from '../modelos/GastoOutputDTO';
import { GastoDialogComponent } from '../gasto-dialog/gasto-dialog.component';

export interface ComentarioDialogData {
  comentarioID: string;
  tareaID: string;
  comentarioOutputDTO: ComentarioOutputDTO;
}

export interface GastoDialogData {
  gastoID: string;
  tareaID: string;
  gastoOutputDTO: GastoOutputDTO;
}


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
  editedTarea?: TareaOutputDTO;
  comentarios: ComentarioInputDTO[] = [];
  comentario? : ComentarioOutputDTO;
  gasto?: GastoOutputDTO;
  isLoading: boolean = false;

  constructor(private tareaService: TareaService, public dialog: MatDialog, private router: Router, private comentarioService: ComentarioService, private gastoService: GastoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.tareaID = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadData()
  }

  setParams(data: any) {
    this.tarea = data.body;
    this.hobbyID = this.tarea.hobbyID;
  }

  openIMG(url: string) {
    window.open(url);
  }

  procesarRespuestaTarea(data: HttpResponse<any>, method: string): void {
    if (data && data.status === 200 && method === 'DELETE') {
      this.router.navigateByUrl(`/hobbys/${this.hobbyID}/view`);
    } else if (data && data.status === 200) {
      this.loadData();
    }
  }

  loadData() {
    this.isLoading = true;
    this.tareaService.getTarea(this.tareaID!).subscribe(data => this.setParams(data));
    this.gastoService.getGastosByTarea(this.tareaID!).subscribe(data => this.gastos = data.body);
    this.comentarioService.getComentariosByTarea(this.tareaID!).subscribe(data => {
      this.comentarios = data.body;
      this.isLoading = false;
    });
  }

  editTarea() {
    this.editedTarea = new TareaOutputDTO();
    this.editedTarea.titulo = this.tarea.titulo;
    this.editedTarea.descripcion = this.tarea.descripcion;
    this.editedTarea.estado = this.tarea.estado;
    this.openTareaDialog();
  }

  openTareaDialog() {
    const dialogRef = this.dialog.open(TareaDialogOverviewComponent, { width: '500px', data: { hobbyID: this.hobbyID, tareaOutputDTO: this.editedTarea, tareaID: this.tareaID } });
    dialogRef.afterClosed().subscribe(result => {
      this.procesarRespuestaTarea(result, 'PUT');
    });
  }

  addGasto(){
    const dialogRef = this.dialog.open(GastoDialogComponent, { width: '500px', data: { tareaID: this.tareaID, gastoOutputDTO: new GastoOutputDTO() } })
    dialogRef.afterClosed().subscribe(result => {
      this.procesarRespuesta(result);
    })
  }

  editGasto(gastoInput: GastoInputDTO){
    this.gasto = new GastoOutputDTO();
    this.gasto.concepto= gastoInput.concepto;
    this.gasto.comentario = gastoInput.comentario;
    this.gasto.cantidad = gastoInput.cantidad;
    this.gasto.fechaGasto = gastoInput.fechaGasto;
    const dialogRef = this.dialog.open(GastoDialogComponent, { width: '500px', data: { tareaID: this.tareaID, gastoOutputDTO: this.gasto, gastoID: gastoInput.id } })
    dialogRef.afterClosed().subscribe(result => {
      this.procesarRespuesta(result);
    })
  }

  deleteGasto(id:string){

  }

  editComentario(index: ComentarioInputDTO) {
    this.comentario=  new ComentarioOutputDTO();
    this.comentario.comentario = index.comentario;
    const dialogRef = this.dialog.open(ComentarioDialogComponent, { width: '500px', data: { tareaID: this.tareaID, comentarioOutputDTO: this.comentario, comentarioID: index.id} })
    dialogRef.afterClosed().subscribe(result => {
      this.procesarRespuesta(result);
    })
  }

  deleteComentario(id: string) {
    Swal.fire({
      title: '¿Borrar este comentario?',
      text: "Si se borra este comentario tambien se eliminarán las imagenes asociadas.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'warn',
      focusCancel: true,
      confirmButtonText: 'Sí, eliminar',
      customClass: {
        cancelButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-primary',
        confirmButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-warn'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.comentarioService.deleteComentarioByID(id).subscribe(data => this.procesarRespuesta(data));
      }
    })
  }
  procesarRespuesta(data: HttpResponse<any>): void {
    if (data && data.status === 200) {
      this.loadData();
    }
  }

  addCommentario() {

    const dialogRef = this.dialog.open(ComentarioDialogComponent, { width: '500px', data: { tareaID: this.tareaID, comentarioOutputDTO: new ComentarioOutputDTO() } })
    dialogRef.afterClosed().subscribe(result => {
      this.procesarRespuesta(result);
    })
  }

  delete() {
    Swal.fire({
      title: 'Borrar la tarea ' + this.tarea.titulo,
      text: "Si se borra la tarea tambien se eliminarán los comentarios y gastos asociados.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'warn',
      focusCancel: true,
      confirmButtonText: 'Sí, eliminar',
      customClass: {
        cancelButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-primary',
        confirmButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-warn'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.tareaService.deleteTareaByID(this.tareaID!).subscribe(data => this.procesarRespuestaTarea(data, 'DELETE'));
      }
    })
  }
}
