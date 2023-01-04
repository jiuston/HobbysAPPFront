import { Component, OnInit } from '@angular/core';
import { Estado } from '../modelos/estados';
import { Hobby } from '../modelos/hobby';
import { SimpleTareaInputDTO } from '../modelos/simpleTareaInputDTO';
import { HobbyService } from '../services/hobby.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  estados = Object.values(Estado);
  isLoading :boolean = false;
  constructor() { }
  
  ngOnInit(): void {

  }



}
