import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CalipsoplusService } from '../calipsoplus.service'
import { CalipsoUser } from '../calipso-user';
import { error } from 'util';



@Component({
  selector: 'app-login-calipso-user-form',
  templateUrl: './login-calipso-user-form.component.html',
  styleUrls: ['./login-calipso-user-form.component.css']
})


export class LoginCalipsoUserFormComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router, private calipsoService: CalipsoplusService) { }

  login() {
    this.calipsoService.auth(this.username, this.password).subscribe((success) => {
      this.router.navigate(['facility']);
    },
      (error) => {
        alert("Error");
      }
    );
  }


  ngOnInit() {
  }
}