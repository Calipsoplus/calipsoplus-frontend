import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

@Component({
  selector: 'app-home-calipso-page',
  templateUrl: './home-calipso-page.component.html',
  styleUrls: ['./home-calipso-page.component.css']
})
export class HomeCalipsoPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
