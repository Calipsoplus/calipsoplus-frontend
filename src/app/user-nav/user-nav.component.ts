import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  jupyterhubEnabled = environment.jupyterhubEnabled;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  navigateExperiments() {
    this.router.navigate(['/experiment']);
  }

  navigateJupyter() {
    if (this.jupyterhubEnabled) {
      window.location.href = environment.jupyterjubUrl;
    }
  }

  navigateAdmin() {
    this.router.navigate(['/admin']);
  }

  navigateVirtualMachines() {
    this.router.navigate(['/resource']);
  }

  navigateContainers() {
    this.router.navigate(['/resource']);
  }
}
