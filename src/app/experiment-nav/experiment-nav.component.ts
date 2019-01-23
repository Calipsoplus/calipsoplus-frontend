import { Component, OnInit } from '@angular/core';
import { CalipsoplusService } from '../calipsoplus.service';

@Component({
  selector: 'app-experiment-nav',
  templateUrl: './experiment-nav.component.html',
  styleUrls: ['./experiment-nav.component.css']
})
export class ExperimentNavComponent implements OnInit {

  constructor(public calipsoService: CalipsoplusService) { }

  ngOnInit() {
  }

}
