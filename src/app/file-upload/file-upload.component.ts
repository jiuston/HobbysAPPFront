import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {


  @Input()
  requiredFileType?: string;

  static file: File | null;

  constructor() { }

  ngOnInit(): void {
  }

  static getFile() {
    if (this.file) {
      return this.file;
    } else {
      return null;
    }
  }

  onFileSelected(event: any) {
    if (event.target.files[0]) {
      FileUploadComponent.file = event.target.files[0];
    }

    if (FileUploadComponent.file!.type !== 'image/jpeg' && FileUploadComponent.file!.type !== 'image/png') {
      FileUploadComponent.file = null
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Solo se permiten archivos .png o .jpg',
      });

    }


  }
}
