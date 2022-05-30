import { Component, OnInit } from '@angular/core';
import { Hobby } from '../modelos/hobby';
import { HobbyService } from '../services/hobby.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HobbyDialogOverviewComponent } from '../hobby-dialog-overview/hobby-dialog-overview.component';
import { HobbyOutputDTO } from '../modelos/HobbyOutputDTO';

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

  constructor(private hobbyService: HobbyService, public dialog: MatDialog) { }

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

}
