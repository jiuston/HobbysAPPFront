import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hobby } from '../modelos/hobby';
import { Tarea } from '../modelos/tarea';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-tarea-detail',
  templateUrl: './tarea-detail.component.html',
  styleUrls: ['./tarea-detail.component.css']
})
export class TareaDetailComponent implements OnInit {

  hobbyID?: string;
  tarea?: Tarea;
  tareaID?: string;

  constructor(private tareaService: TareaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tareaID = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.tareaService.getTarea(this.tareaID).subscribe(data => this.setParams(data));
  }

  setParams(data: any) {
    this.tarea = data.body;
    this.hobbyID = this.tarea?.hobbyID;
  }

}
