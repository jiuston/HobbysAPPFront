import { TareaOutputDTO } from './../modelos/TareaOutputDTO';
import { TareaDialogData } from './../hobby-detail/hobby-detail.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TareaService } from '../services/tarea.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { __values } from 'tslib';

@Component({
  selector: 'app-tarea-dialog-overview',
  templateUrl: './tarea-dialog-overview.component.html',
  styleUrls: ['./tarea-dialog-overview.component.css']
})
export class TareaDialogOverviewComponent implements OnInit {

  newTareaForm: any;
  hobbyID?: string;
  newTarea: TareaOutputDTO = new TareaOutputDTO();
  h1: string = '';
  title: string = '';

  constructor(public dialogRef: MatDialogRef<TareaDialogOverviewComponent>,
    private tareaService: TareaService, @Inject(MAT_DIALOG_DATA) public data: TareaDialogData) { }

  ngOnInit(): void {
    this.hobbyID = this.data.hobbyID;
    this.newTarea = this.data.tareaOutputDTO;
    if (this.newTarea.titulo) {
      this.h1 = `Editar la Tarea ${this.newTarea.titulo}`;
      this.title = `¿Editar esta tarea?`;
    } else {
      this.h1 = 'Añadir tarea nueva para el hobby seleccionado';
      this.title = `¿Añadir esta tarea al hobby seleccionado?`;
    }
    this.newTareaForm = new FormGroup({
      titulo: new FormControl(this.newTarea.titulo, [Validators.required]),
      descripcion: new FormControl(this.newTarea.descripcion, Validators.required),
      estado: new FormControl(this.newTarea.estado)
    });
  }

  get titulo() { return this.newTareaForm.get('titulo') }
  get descripcion() { return this.newTareaForm.get('descripcion') }
  get estado() { return this.newTareaForm.get('estado') }

  closeDialog() {
    this.dialogRef.close();
  }



  addTarea() {
    this.newTarea = this.newTareaForm.value;
    Swal.fire({
      position: 'bottom',
      title: this.title,
      showDenyButton: true,
      confirmButtonText: 'Crear',
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.tareaService.addTareaToHobby(this.newTarea, this.hobbyID!).subscribe(data => this.closeDialogWithData(data));
      } else {
        Swal.fire('Tarea no creada', '', 'info');
      }
    })
  }
  closeDialogWithData(data: HttpResponse<any>): void {
    this.dialogRef.close(data);
  }

}
