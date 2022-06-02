import { Subscription } from 'rxjs';
import { Estado } from './../modelos/estados';
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
  buttonText: string = '';
  infoDeniedText: string='';
  estado?: Estado;
  estados = Object.values(Estado);

  constructor(public dialogRef: MatDialogRef<TareaDialogOverviewComponent>,
    private tareaService: TareaService, @Inject(MAT_DIALOG_DATA) public data: TareaDialogData) { }

  ngOnInit(): void {
    this.hobbyID = this.data.hobbyID;
    this.newTarea = this.data.tareaOutputDTO;
    if (this.newTarea.titulo) {
      this.h1 = `Editar la Tarea ${this.newTarea.titulo}`;
      this.title = `¿Editar esta tarea?`;
      this.buttonText = "EDITAR"
      this.infoDeniedText='editada';
      this.estado = this.newTarea.estado!;
    } else {
      this.h1 = 'Añadir tarea nueva para el hobby seleccionado';
      this.title = `¿Añadir esta tarea al hobby seleccionado?`;
      this.buttonText = "CREAR"
      this.infoDeniedText = 'creada';
    }
    this.newTareaForm = new FormGroup({
      titulo: new FormControl(this.newTarea.titulo, [Validators.required]),
      descripcion: new FormControl(this.newTarea.descripcion, Validators.required),
    });
  }

  get titulo() { return this.newTareaForm.get('titulo') }
  get descripcion() { return this.newTareaForm.get('descripcion') }

  closeDialog() {
    this.dialogRef.close();
  }



  addTarea() {
    this.newTarea = this.newTareaForm.value;
    if (this.estado === null) this.newTarea.estado = null;
    else this.newTarea.estado = this.estado;
    Swal.fire({
      position: 'center',
      title: this.title,
      showCancelButton: true,
      confirmButtonText: this.buttonText,
      cancelButtonText: `CANCELAR`,
      customClass: { 
        cancelButton : 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-warn',
        confirmButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-primary'},
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.data.tareaID) {
          this.tareaService.editTarea(this.newTarea, this.data.tareaID).subscribe(data => this.closeDialogWithData(data))
        } else {
          this.tareaService.addTareaToHobby(this.newTarea, this.hobbyID!).subscribe(data => this.closeDialogWithData(data));
        }

      } else {
        Swal.fire({
          title: `Tarea no ${this.infoDeniedText}`,
          position: 'center',
          icon: 'info',
          timer: 1000,
          showConfirmButton: false,          
        })
      }
    })
  }
  closeDialogWithData(data: HttpResponse<any>): void {
    this.dialogRef.close(data);
  }

}
