import { FileUploadComponent } from './../file-upload/file-upload.component';
import { HobbyService } from './../services/hobby.service';
import { HobbyOutputDTO } from './../modelos/HobbyOutputDTO';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-hobby-dialog-overview',
  templateUrl: './hobby-dialog-overview.component.html',
  styleUrls: ['./hobby-dialog-overview.component.css']
})
export class HobbyDialogOverviewComponent implements OnInit {

  newHobbyForm: any;
  newHobby: HobbyOutputDTO = new HobbyOutputDTO();
  file?: File;
  formData?: FormData;

  constructor(public dialogRef: MatDialogRef<HobbyDialogOverviewComponent>,
    private hobbyService: HobbyService) { }

  ngOnInit(): void {
    this.newHobbyForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl(''),
    });
  }

  get nombre() { return this.newHobbyForm.get('nombre') }
  get descripcion() { return this.newHobbyForm.get('descripcion') }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addHobby() {
    this.newHobby = this.newHobbyForm.value;
    Swal.fire({
      title: '¿Crear Hobby?',
      showDenyButton: true,
      confirmButtonText: 'Crear',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.formData = new FormData();
        this.file = FileUploadComponent.getFile();
        if (this.file) {
          this.formData.append('file', this.file!, this.file!.name);
        }
        this.formData.append('hobbyInputDTO', new Blob([JSON.stringify(this.newHobby)],
          { type: 'application/json' }));
        this.hobbyService.addHobby(this.formData).subscribe(data => this.confirmPost(data));
      } else if (result.isDenied) {
        Swal.fire('Hobby no creado', '', 'info');
      }
      this.onNoClick();
    })

  }
  confirmPost(data: HttpResponse<any>): void {
    if (data.status === 200)
      Swal.fire('Saved!', '', 'success')
  }

}
