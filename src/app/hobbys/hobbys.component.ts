import { Component, OnInit } from '@angular/core';
import { Hobby } from '../modelos/hobby';
import { HobbyService } from '../services/hobby.service';

@Component({
  selector: 'app-hobbys',
  templateUrl: './hobbys.component.html',
  styleUrls: ['./hobbys.component.css']
})
export class HobbysComponent implements OnInit {

  hobbys: Hobby[] = [];

  constructor(private hobbyService: HobbyService) { }

  ngOnInit(): void {
    this.hobbyService.getAllHobbys().subscribe(data => this.hobbys = data.body);
  }

  openIMG(url: string) {
    window.open(url);
  }

}
