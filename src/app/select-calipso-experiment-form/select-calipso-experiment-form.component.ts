import { Component, OnInit } from '@angular/core';
import { CalipsoplusService } from "../calipsoplus.service";
import { CalipsoExperiment } from "../calipso-experiment";

import { Router } from "@angular/router";

@Component({
  selector: 'app-select-calipso-experiment-form',
  templateUrl: './select-calipso-experiment-form.component.html',
  styleUrls: ['./select-calipso-experiment-form.component.css']
})
export class SelectCalipsoExperimentFormComponent implements OnInit {

  experiments: CalipsoExperiment[];
  selectedVal: Number;

  constructor( private calipsoService: CalipsoplusService, private router: Router) { }

  ngOnInit() {
    if (this.calipsoService.isLogged()) {
      let username = this.calipsoService.getLoggedUserName();
      this.calipsoService.getCalipsoExperiments(username).subscribe(
        data => this.experiments = data);
    }else {
      this.router.navigate(['login']);
    }
  }


  public logout(){
    this.calipsoService.logout();
  }
}

