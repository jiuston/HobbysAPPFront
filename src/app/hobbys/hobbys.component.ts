import { Component, OnInit } from '@angular/core';
import { Hobby } from '../modelos/hobby';
import { HobbyService } from '../services/hobby.service';
import { MatDialog } from '@angular/material/dialog';
import { HobbyDialogOverviewComponent } from '../hobby-dialog-overview/hobby-dialog-overview.component';
import { HobbyOutputDTO } from '../modelos/HobbyOutputDTO';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export interface DialogData {
  newHobby: HobbyOutputDTO;
  hobbyID: string;
}

@Component({
  selector: 'app-hobbys',
  templateUrl: './hobbys.component.html',
  styleUrls: ['./hobbys.component.css']
})
export class HobbysComponent implements OnInit {

  hobbys: Hobby[] = [];
  newHobby: HobbyOutputDTO = new HobbyOutputDTO();
  hobbyID?: string;

  constructor(private hobbyService: HobbyService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadHobbys();
  }

  loadHobbys() {
    this.hobbyService.getAllHobbys().subscribe(data => this.hobbys = data.body);
  }

  openIMG(url: string) {
    window.open(url);
  }

  openDialog() {
    const dialogRef = this.dialog.open(HobbyDialogOverviewComponent, { width: '500px', data: { newHobby: this.newHobby, hobbyID: this.hobbyID } });
    dialogRef.afterClosed().subscribe(result => {
      this.procesarRespuesta(result);
      this.newHobby = new HobbyOutputDTO();
      this.hobbyID = undefined;
    });
  }

  delete(index: number) {
    let hobby = this.hobbys[index];
    Swal.fire({
      title: 'Borrar el hobby ' + hobby.nombre,
      text: "Si se borra el hobby tambien se eliminarán las tareas asociadas.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusCancel: true,
      confirmButtonText: 'Sí, eliminar',
      buttonsStyling: false,
      customClass: { cancelButton : 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-primary',
                      confirmButton: 'mat-focus-indicator SwalButtons mat-raised-button mat-button-base mat-warn'},

    }).then((result) => {
      if (result.isConfirmed) {
        this.hobbyService.deleteHobbyByID(hobby.id).subscribe(data => this.procesarRespuesta(data));

      }
    })
  }

  procesarRespuesta(data: HttpResponse<any>): void {
    if (data && data.status === 200) {
      this.loadHobbys();
    }
  }

  editHobby(index: number) {
    let hobby = this.hobbys[index];
    this.newHobby.nombre = hobby.nombre;
    this.newHobby.descripcion = hobby.descripcion;
    this.hobbyID = hobby.id;
    this.openDialog();
  }

}


