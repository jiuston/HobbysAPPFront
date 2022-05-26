import { SimpleTareaInputDTO } from '../modelos/simpleTareaInputDTO';
import { HobbyService } from './../services/hobby.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hobby } from '../modelos/hobby';
import { TareaService } from '../services/tarea.service';

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

  constructor(private activatedRoute: ActivatedRoute, private tareaService: TareaService, private hobbyService: HobbyService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.hobbyService.getHobby(this.id).subscribe(data => this.hobby = data.body);
    this.tareaService.getTareasByHobbyId(this.id).subscribe(data => this.tareas = data.body);
  }

}
