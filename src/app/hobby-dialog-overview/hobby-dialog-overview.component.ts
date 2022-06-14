import { Observable, of } from 'rxjs';
import { FileUploadComponent } from './../file-upload/file-upload.component';
import { HobbyService } from './../services/hobby.service';
import { HobbyOutputDTO } from './../modelos/HobbyOutputDTO';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { DialogData } from '../hobbys/hobbys.component';

@Component({
  selector: 'app-hobby-dialog-overview',
  templateUrl: './hobby-dialog-overview.component.html',
  styleUrls: ['./hobby-dialog-overview.component.css']
})
export class HobbyDialogOverviewComponent implements OnInit {

  newHobbyForm: any;
  newHobby?: HobbyOutputDTO;
  file?: File;
  formData?: FormData;
  h1: string = '';
  buttonText: string = '';
  hobbyID?: string;
  infoText: string = '';
  checkBox: boolean = false;
  hobbyName: string = '';
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<HobbyDialogOverviewComponent>,
    private hobbyService: HobbyService, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.clean();
    this.newHobby = this.data.newHobby;
    this.hobbyID = this.data.hobbyID;
    this.hobbyName = this.newHobby.nombre;
    if (this.hobbyID) {
      this.h1 = "Editar el hobby " + this.newHobby.nombre + ":";
      this.buttonText = 'Editar';
      this.infoText = "Hobby no editado"
    } else {
      this.h1 = "Añadir nuevo hobby:";
      this.buttonText = "Crear"
      this.infoText = "Hobby no creado"
    }
    this.newHobbyForm = new FormGroup({
      nombre: new FormControl(this.newHobby.nombre, [Validators.required]),
      descripcion: new FormControl(this.newHobby.descripcion)
    });
  }

  get nombre() { return this.newHobbyForm.get('nombre') }
  get descripcion() { return this.newHobbyForm.get('descripcion') }


  closeDialogWithData(data: any): void {
    this.dialogRef.close(data);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addHobby() {
    this.newHobby = this.newHobbyForm.value;
    Swal.fire({
      title: `¿${this.buttonText} Hobby ${this.nombre.value}?`,
      text: `Descripcion: ${this.descripcion.value}`,
      showCancelButton: true,
      confirmButtonText: this.buttonText,
      cancelButtonText: `Cancelar`,
      customClass: {
        cancelButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-primary',
        confirmButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-warn'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.formData = new FormData();
        this.file = FileUploadComponent.getFile()!;
        if (this.file) {
          this.formData.append('file', this.file!, this.file!.name);
        }
        this.formData.append('hobbyInputDTO', new Blob([JSON.stringify(this.newHobby)],
          { type: 'application/json' }));
        if (this.hobbyID) {
          this.hobbyService.editHobby(this.formData, this.hobbyID, this.checkBox).subscribe({
            next: data => {
              this.closeDialogWithData(data);
              this.isLoading = false;
            },
            error: err => {
              this.isLoading = false;
            }
          });
        } else {
          this.hobbyService.addHobby(this.formData).subscribe({
            next: data => {
              this.closeDialogWithData(data);
              this.isLoading = false;
            },
            error: err => {
              this.isLoading = false;
            }
          });
        }
        this.clean();
      } else if (result.isDenied) {
        Swal.fire(this.infoText, '', 'info');
      }

    })

  }

  clean() {
    FileUploadComponent.file = null;
    this.hobbyID = undefined;
    this.newHobby = undefined;
  }

}




