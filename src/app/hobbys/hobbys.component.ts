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
}

@Component({
  selector: 'app-hobbys',
  templateUrl: './hobbys.component.html',
  styleUrls: ['./hobbys.component.css']
})
export class HobbysComponent implements OnInit {

  hobbys: Hobby[] = [];
  newHobby: HobbyOutputDTO = new HobbyOutputDTO();

  constructor(private hobbyService: HobbyService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.hobbyService.getAllHobbys().subscribe(data => this.hobbys = data.body);
  }

  openIMG(url: string) {
    window.open(url);
  }

  openDialog() {
    const dialogRef = this.dialog.open(HobbyDialogOverviewComponent, { width: '500px', data: { newHobby: this.newHobby } });
    dialogRef.afterClosed().subscribe(result => {
      this.newHobby = result;
    });
  }

  delete(hobbyID: string, hobbyName: string){
    Swal.fire({
      title: 'Borrar el hobby ' + hobbyName,
      text: "Si se borra el hobby tambien se eliminarán las tareas asociadas.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hobbyService.deleteHobbyByID(hobbyID).subscribe(data => this.procesarRespuesta(data));

      }
    })
  }

  procesarRespuesta(data: HttpResponse<any>): void {
    if(data.status===200){
        this.router.navigateByUrl("/hobbys");
    }
  }
}


