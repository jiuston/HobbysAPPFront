import { TareaOutputDTO } from './../modelos/TareaOutputDTO';
import { SimpleTareaInputDTO } from '../modelos/simpleTareaInputDTO';
import { HobbyService } from './../services/hobby.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hobby } from '../modelos/hobby';
import { TareaService } from '../services/tarea.service';
import { MatDialog } from '@angular/material/dialog';
import { HobbyDialogOverviewComponent } from '../hobby-dialog-overview/hobby-dialog-overview.component';
import { HobbyOutputDTO } from '../modelos/HobbyOutputDTO';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TareaDialogOverviewComponent } from '../tarea-dialog-overview/tarea-dialog-overview.component';

export interface TareaDialogData {
  hobbyID: string;
  tareaOutputDTO: TareaOutputDTO;
  tareaID: string;
}

@Component({
  selector: 'app-hobby-detail',
  templateUrl: './hobby-detail.component.html',
  styleUrls: ['./hobby-detail.component.css']
})
export class HobbyDetailComponent implements OnInit {

  id?: string;
  hobby: Hobby = new Hobby();
  tareas: SimpleTareaInputDTO[] = [];
  tareaSelected?: SimpleTareaInputDTO;
  editedHobby?: HobbyOutputDTO;
  isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog, private tareaService: TareaService, private hobbyService: HobbyService) { }

  ngOnInit(): void {
    this.isLoading=true
    this.loadHobby();
  }

  openIMG(url: string) {
    window.open(url);
  }

  openDialog() {
    const dialogRef = this.dialog.open(HobbyDialogOverviewComponent, { width: '500px', data: { newHobby: this.editedHobby, hobbyID: this.id } });
    dialogRef.afterClosed().subscribe(result => {
      this.procesarRespuesta(result);
    });
  }

  openTareaDialog() {
    const dialogRef = this.dialog.open(TareaDialogOverviewComponent, { width: '500px', data: { hobbyID: this.id, tareaOutputDTO: new TareaOutputDTO() } });
    dialogRef.afterClosed().subscribe(result => {
      this.procesarRespuesta(result);
    });
  }

  procesarRespuesta(data: HttpResponse<any>): void {
    if (data && data.status === 200) {
      this.loadHobby();
    }
  }

  loadHobby() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.hobbyService.getHobby(this.id).subscribe(data => this.hobby = data.body);
    this.tareaService.getTareasByHobbyId(this.id).subscribe(data => {
      this.tareas = data.body;
      this.isLoading=false;
    });
  }

  editHobby() {
    this.editedHobby = new HobbyOutputDTO();
    this.editedHobby.nombre = this.hobby.nombre;
    this.editedHobby.descripcion = this.hobby.descripcion;
    this.openDialog()
  }

  delete() {
    Swal.fire({
      title: 'Borrar el hobby ' + this.hobby.nombre,
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
        this.hobbyService.deleteHobbyByID(this.id!).subscribe(data => this.procesarRespuesta(data));

      }
    })
  }


}
