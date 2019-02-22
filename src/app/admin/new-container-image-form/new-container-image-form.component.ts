import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CalipsoImage} from '../../calipso-image';
import {CalipsoplusService} from '../../calipsoplus.service';

@Component({
  selector: 'app-new-container-image-form',
  templateUrl: './new-container-image-form.component.html',
  styleUrls: ['./new-container-image-form.component.css']
})
export class NewContainerImageFormComponent implements OnInit {
  submitted = false;

  model = new CalipsoImage('public_name', 'image', 'RDP', 1, '10G', '50G',
    'container');
  resources = ['docker', 'kubernetes', 'static link', 'virtual machine'];

  constructor(private modalService: NgbModal, private calipsoService: CalipsoplusService) {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    console.log('post requesting!');
    this.calipsoService.addNewImage(this.model);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      console.log(reason);
    });
  }
}
