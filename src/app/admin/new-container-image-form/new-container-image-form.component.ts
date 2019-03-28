import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CalipsoImage} from '../../calipso-image';
import {CalipsoplusService} from '../../calipsoplus.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-container-image-form',
  templateUrl: './new-container-image-form.component.html',
  styleUrls: ['./new-container-image-form.component.css']
})
export class NewContainerImageFormComponent implements OnInit {
  submitted = false;

  publicNameCtrl: FormControl;
  imageCtrl: FormControl;
  protocolCtrl: FormControl;
  cpuCtrl: FormControl;
  memoryCtrl: FormControl;
  hddCtrl: FormControl;
  resourceCtrl: FormControl;
  containerForm: FormGroup;

  model = new CalipsoImage('public_name', 'image', 'RDP', '', 1, '10G', '50G',
    'container');
  resources = ['docker', 'kubernetes', 'static link', 'virtual machine'];

  constructor(private modalService: NgbModal, private calipsoService: CalipsoplusService, private fb: FormBuilder) {}

  ngOnInit() {
    this.publicNameCtrl = this.fb.control('', Validators.required);
    this.imageCtrl = this.fb.control('', Validators.required);
    this.protocolCtrl = this.fb.control('', Validators.required);
    this.cpuCtrl = this.fb.control('', Validators.required);
    this.memoryCtrl = this.fb.control('', Validators.required);
    this.hddCtrl = this.fb.control('', Validators.required);
    this.resourceCtrl = this.fb.control('', Validators.required);
    this.containerForm = this.fb.group({
      publicName: this.publicNameCtrl,
      image: this.imageCtrl,
      protocol: this.protocolCtrl,
      cpu: this.cpuCtrl,
      memory: this.memoryCtrl,
      hdd: this.hddCtrl,
      resource: this.resourceCtrl
    });
  }

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
