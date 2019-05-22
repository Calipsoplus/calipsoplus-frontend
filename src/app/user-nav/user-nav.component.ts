import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { CalipsoplusService } from '../calipsoplus.service';


@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  jupyterhubEnabled = environment.servers.jupyterhub.enabled;
  isAdmin = false;

  constructor(private router: Router,
              private calipsoService: CalipsoplusService) { }

  ngOnInit() {
    this.checkAdmin();
  }

  checkAdmin() {
    this.calipsoService.isAdmin().then(res => {
      this.isAdmin = res;
    });
  }

  navigateExperiments() {
    this.router.navigate(['/experiment']);
  }

  navigateJupyter() {
    if (this.jupyterhubEnabled) {
      window.location.href = environment.servers.jupyterhub.url;
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
