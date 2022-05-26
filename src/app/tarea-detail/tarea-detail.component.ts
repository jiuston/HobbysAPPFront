import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TareaInputDTO } from '../modelos/TareaInputDTO';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-tarea-detail',
  templateUrl: './tarea-detail.component.html',
  styleUrls: ['./tarea-detail.component.css']
})
export class TareaDetailComponent implements OnInit {

  hobbyID: string='';
  tarea: TareaInputDTO= new TareaInputDTO();
  tareaID?: string;

  constructor(private tareaService: TareaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.hobbyID!=localStorage.getItem('hobbyID');
    this.tareaID = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.tareaService.getTarea(this.tareaID).subscribe(data => this.setParams(data));
  }

  setParams(data: any) {
    this.tarea = data.body;
    this.hobbyID=this.tarea.hobbyID;
  }

}
