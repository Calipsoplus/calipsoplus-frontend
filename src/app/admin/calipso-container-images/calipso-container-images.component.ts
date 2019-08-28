import { Component, OnInit } from '@angular/core';
import {CalipsoplusService} from '../../calipsoplus.service';
import {CalipsoImage} from '../../calipso-image';

@Component({
  selector: 'app-calipso-container-images',
  templateUrl: './calipso-container-images.component.html',
  styleUrls: ['./calipso-container-images.component.css']
})
export class CalipsoContainerImagesComponent implements OnInit {
  images: CalipsoImage[] = [];

  constructor(
    private calipsoService: CalipsoplusService
  ) {}

  ngOnInit() {
    this.getAvailableImages();
  }

  getAvailableImages() {
    this.calipsoService.getAllAvailableImages().subscribe(
      res => {
        this.images = res;
      },
      error => {
        console.log(error);
      }
    );
  }

}
