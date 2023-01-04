import { Component, Input, OnInit } from '@angular/core';
import { SimpleTareaInputDTO } from '../modelos/simpleTareaInputDTO';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-trello-list',
  templateUrl: './trello-list.component.html',
  styleUrls: ['./trello-list.component.css']
})
export class TrelloListComponent implements OnInit {
  @Input()
  estado!: string;

  tareas: SimpleTareaInputDTO[] = [];

  constructor(private tareaService: TareaService) { }

  ngOnInit(): void {
    this.loadTareas();
  }
  loadTareas() {
    this.tareaService.getTareasByState(this.estado).subscribe(data => {
      this.tareas = data.body;
    });
  }

}
