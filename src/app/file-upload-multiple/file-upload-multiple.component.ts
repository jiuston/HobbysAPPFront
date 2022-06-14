import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'file-upload-multiple',
  templateUrl: './file-upload-multiple.component.html',
  styleUrls: ['./file-upload-multiple.component.css']
})
export class FileUploadMultipleComponent implements OnInit {
  @Input()
  requiredFileType?: string;


  fileName = '';
  static files: File[] | null;

  constructor() { }

  ngOnInit(): void {
  }

  static getFiles(): any {
    return this.files;
  }

  onFileSelected(event: any) {
    if (event.target.files[0]) {
      FileUploadMultipleComponent.files = event.target.files;
    }
    for (let x = 0; x < FileUploadMultipleComponent.files!.length; x++) {
      if (FileUploadMultipleComponent.files![x].type !== 'image/jpeg' && FileUploadMultipleComponent.files![x].type !== 'image/png') {
        this.fileName = '';
        FileUploadMultipleComponent.files = []
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Solo se permiten archivos .png o .jpg',
        });
      }
    }

  }
}
