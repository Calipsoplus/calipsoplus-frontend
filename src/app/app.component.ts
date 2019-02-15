import {Component, OnInit} from '@angular/core';
import { CalipsoplusService } from './calipsoplus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CALIPSOplus';

  constructor(private calipsoService: CalipsoplusService) {}

  ngOnInit() {
    this.calipsoService.getCalipsoSettings().subscribe(settings => {
      this.calipsoService.defaultCalipsoSettings = settings;
    });
  }
}
