import { FileUploadMultipleComponent } from './../file-upload-multiple/file-upload-multiple.component';
import { __values } from 'tslib';
import { FileUploadComponent } from './../file-upload/file-upload.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComentarioService } from './../services/comentario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ComentarioOutputDTO } from '../modelos/ComentarioOutputDTO';
import { ComentarioDialogData } from '../tarea-detail/tarea-detail.component';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-comentario-dialog',
  templateUrl: './comentario-dialog.component.html',
  styleUrls: ['./comentario-dialog.component.css']
})
export class ComentarioDialogComponent implements OnInit {

  comentarioForm: any;
  tareaID?: string;
  newComentario: ComentarioOutputDTO = new ComentarioOutputDTO();
  h1?: string;
  title: string = '';
  buttonText: string = '';
  isLoading: boolean = false;
  comentarioID?: string;
  files: any;
  formData?: FormData;

  constructor(public dialogRef: MatDialogRef<ComentarioDialogComponent>,
    private comentarioService: ComentarioService, @Inject(MAT_DIALOG_DATA) public data: ComentarioDialogData) { }

  ngOnInit(): void {
    this.clean();
    this.tareaID = this.data.tareaID;
    this.comentarioID = this.data.comentarioID;
    this.newComentario = this.data.comentarioOutputDTO;
    if (this.comentarioID) {
      this.h1 = `Editar comentario.`;
      this.buttonText = 'EDITAR';
      this.title = `¿Editar este comentario?`;

    } else {
      this.h1 = 'Publicar nuevo comentario para la tarea seleccionada';
      this.buttonText = "PUBLICAR";
      this.title = `¿Publicar este comentario?`;
    }

    this.comentarioForm = new FormGroup({
      comentario: new FormControl(this.newComentario.comentario, [Validators.required])
    });
  }

  get comentario() { return this.comentarioForm.get('comentario'); }

  clean() {
    FileUploadMultipleComponent.files = null;
    this.tareaID = undefined;
    this.comentarioID = undefined;
    this.newComentario = new ComentarioOutputDTO();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addComentario() {
    this.newComentario = this.comentarioForm.value;
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

        this.formData.append('comentarioInputDTO', new Blob([JSON.stringify(this.newComentario.comentario)], { type: 'application/json' }));
        if (this.comentarioID) {
          this.comentarioService.editComentario(this.newComentario, this.formData,this.comentarioID!).subscribe(data => this.closeDialogWithData(data))
        } else {
          this.comentarioService.addComentario(this.tareaID!, this.formData).subscribe(data => this.closeDialogWithData(data));
        }

      }
    });
  }

  closeDialogWithData(data: HttpResponse<any>): void {
    this.isLoading = false;
    this.dialogRef.close(data);
  }
}
