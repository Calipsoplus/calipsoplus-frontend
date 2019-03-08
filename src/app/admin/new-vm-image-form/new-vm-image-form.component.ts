import { Component, OnInit } from '@angular/core';
import {CalipsoImage} from '../../calipso-image';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalipsoplusService} from '../../calipsoplus.service';

@Component({
  selector: 'app-new-vm-image-form',
  templateUrl: './new-vm-image-form.component.html',
  styleUrls: ['./new-vm-image-form.component.css']
})
export class NewVmImageFormComponent implements OnInit {

  submitted = false;

  model = new CalipsoImage('public_name', 'image', 'RDP', '', 1, '10G', '50G',
    'container');
  resources = ['docker', 'kubernetes', 'static link', 'virtual machine'];

  constructor(private modalService: NgbModal, private calipsoService: CalipsoplusService) {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    console.log('post requesting!');
    this.calipsoService.addNewVmImage(this.model);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      console.log(reason);
    });
  }
}
