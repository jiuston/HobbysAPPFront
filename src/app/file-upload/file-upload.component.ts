import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input()
  requiredFileType?: string;

  fileName = '';
  static file: any;

  constructor() { }

  ngOnInit(): void {
  }

  static getFile() {
    return this.file;
  }

  onFileSelected(event: any) {
    if (event.target.files[0]) {
      FileUploadComponent.file = event.target.files[0];
      this.fileName = FileUploadComponent.file.name;
      console.log(FileUploadComponent.file.type)
    }
    if (FileUploadComponent.file.type !== 'image/jpeg' && FileUploadComponent.file.type !== 'image/png') {
      this.fileName = '';
      FileUploadComponent.file = null;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Solo se permiten archivos .png o .jpg',
      });
    }
  }
}