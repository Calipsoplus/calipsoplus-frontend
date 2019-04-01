import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CalipsoImage} from '../../calipso-image';
import {CalipsoplusService} from '../../calipsoplus.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-new-container-image-form',
  templateUrl: './new-container-image-form.component.html',
  styleUrls: ['./new-container-image-form.component.css']
})
export class NewContainerImageFormComponent implements OnInit {

  containerImageForm: FormGroup;
  protocolsSupported = ['RDP', 'VNC'];
  ngOnInit() {

    this.containerImageForm = this.fb.group({
    publicName: ['', Validators.required],
    image: ['', Validators.required],
    protocol: ['', Validators.required],
    cpu: ['', Validators.required],
    memory: ['', Validators.required],
    hdd: ['', Validators.required],
    resource: ['', Validators.required],
  });
  }

  constructor(private modalService: NgbModal, private calipsoService: CalipsoplusService, private fb: FormBuilder) {}

  onSubmit() {
    const newImage = new CalipsoImage(this.containerImageForm.value['publicName'], this.containerImageForm.value['image'],
      this.containerImageForm.value['protocol'], '', this.containerImageForm.value['cpu'],  this.containerImageForm.value['memory'],
      this.containerImageForm.value['hdd'], this.containerImageForm.value['resource']);
    console.log('post requesting!');
    console.log(newImage);
    this.calipsoService.addNewImage(newImage);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      console.log(reason);
    });
  }
}
