import { Component, OnInit } from '@angular/core';
import {CalipsoImage} from '../../calipso-image';

@Component({
  selector: 'app-calipso-vm-images',
  templateUrl: './calipso-vm-images.component.html',
  styleUrls: ['./calipso-vm-images.component.css']
})
export class CalipsoVmImagesComponent implements OnInit {
  images: CalipsoImage[] = [];

  constructor() { }

  ngOnInit() {
  }

}
