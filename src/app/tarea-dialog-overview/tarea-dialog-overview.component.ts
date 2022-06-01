import { TareaOutputDTO } from './../modelos/TareaOutputDTO';
import { TareaDialogData } from './../hobby-detail/hobby-detail.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TareaService } from '../services/tarea.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tarea-dialog-overview',
  templateUrl: './tarea-dialog-overview.component.html',
  styleUrls: ['./tarea-dialog-overview.component.css']
})
export class TareaDialogOverviewComponent implements OnInit {

  newTareaForm: any;
  hobbyID?: string;
  newTarea: TareaOutputDTO = new TareaOutputDTO();


  constructor(public dialogRef: MatDialogRef<TareaDialogOverviewComponent>,
    private tareaService: TareaService, @Inject(MAT_DIALOG_DATA) public data: TareaDialogData) { }

  ngOnInit(): void {
    this.hobbyID = this.data.hobbyID;
    this.newTareaForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required)
    });
  }

  get titulo() { return this.newTareaForm.get('titulo') }
  get descripcion() { return this.newTareaForm.get('descripcion') }

  closeDialog() {
    this.dialogRef.close();
  }

  addTarea() {
    this.newTarea = this.newTareaForm.value;
    Swal.fire({
      title: `¿Añadir esta tarea (${this.titulo.value}) al hobby seleccionado?`,
      text: `Descripcion: ${this.descripcion.value}`,
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
