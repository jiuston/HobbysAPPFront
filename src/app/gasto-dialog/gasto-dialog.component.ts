import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FileUploadMultipleComponent } from '../file-upload-multiple/file-upload-multiple.component';
import { GastoOutputDTO } from '../modelos/GastoOutputDTO';
import { GastoService } from '../services/gasto.service';
import { GastoDialogData } from '../tarea-detail/tarea-detail.component';

@Component({
  selector: 'app-gasto-dialog',
  templateUrl: './gasto-dialog.component.html',
  styleUrls: ['./gasto-dialog.component.css']
})
export class GastoDialogComponent implements OnInit {

  gastoForm: any;
  tareaID?: string;
  newGasto: GastoOutputDTO = new GastoOutputDTO();
  h1?: string;
  title: string = '';
  buttonText: string = '';
  isLoading: boolean = false;
  gastoID?:string;
  files: any;
  formData?: FormData;

  constructor(public dialogRef: MatDialogRef<GastoDialogComponent>,public gastoService: GastoService, @Inject(MAT_DIALOG_DATA) public data: GastoDialogData) { }

  ngOnInit(): void {
    this.clean();
    this.tareaID = this.data.tareaID;
    this.gastoID = this.data.gastoID;
    this.newGasto = this.data.gastoOutputDTO;
    if (this.gastoID) {
      this.h1 = `Editar gasto.`;
      this.buttonText = 'EDITAR';
      this.title = `¿Editar este gasto?`;

    } else {
      this.h1 = 'Introducir nuevo gasto para la tarea seleccionada';
      this.buttonText = "Aceptar";
      this.title = `¿Introducir este gasto?`;
  }

this.gastoForm = new FormGroup({
  concepto: new FormControl(this.newGasto.concepto, [Validators.required]),
  cantidad: new FormControl(this.newGasto.cantidad, [Validators.required, Validators.min(0.1)]),
  comentario: new FormControl(this.newGasto.comentario),
  fechaGasto: new FormControl(this.newGasto.fechaGasto)
});

}

get concepto() { return this.gastoForm.get('concepto'); }
get cantidad() { return this.gastoForm.get('cantidad'); }
get comentario() { return this.gastoForm.get('comentario'); }
get fechaGasto() { return this.gastoForm.get('fechaGasto'); }

  
  clean() {
    FileUploadMultipleComponent.files = null;
    this.tareaID = undefined;
    this.gastoID = undefined;
    this.newGasto = new GastoOutputDTO();
  }

  addGasto(){
    this.newGasto = this.gastoForm.value;
    console.log(this.newGasto)
    Swal.fire({
      position: 'center',
      title: this.title,
      showCancelButton: true,
      confirmButtonText: this.buttonText,
      cancelButtonText: `CANCELAR`,
      customClass: {
        cancelButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-warn',
        confirmButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-primary'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.files = FileUploadMultipleComponent.getFiles();
        this.formData = new FormData();
        if (this.files) {
          for (var x = 0; x < this.files.length; x++) {
            this.formData.append("files", this.files[x], this.files[x].name);
          }
        }
        this.formData.append('gastoInputDTO', new Blob([JSON.stringify(this.newGasto)], { type: 'application/json' }));
        if (this.gastoID) {
          this.gastoService.editGasto(this.formData,this.gastoID!).subscribe(data => this.closeDialogWithData(data))
        } else {
          this.gastoService.addGasto(this.tareaID!, this.formData).subscribe(data => this.closeDialogWithData(data));
        }

      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  
  closeDialogWithData(data: HttpResponse<any>): void {
    this.isLoading = false;
    this.dialogRef.close(data);
  }

}
