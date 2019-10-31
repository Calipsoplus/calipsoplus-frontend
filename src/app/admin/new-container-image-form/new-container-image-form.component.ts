import {Component, OnInit} from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  modalReference: NgbModalRef;
  closeResult: any;

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

  constructor(private modalService: NgbModal, private calipsoService: CalipsoplusService, private fb: FormBuilder) {
  }

  onSubmit() {
    const newImage = new CalipsoImage(this.containerImageForm.value['publicName'], this.containerImageForm.value['image'],
      this.containerImageForm.value['protocol'], '', this.containerImageForm.value['cpu'], this.containerImageForm.value['memory'],
      this.containerImageForm.value['hdd'], this.containerImageForm.value['resource']);
    console.log('post requesting!');
    console.log(newImage);
    this.calipsoService.addNewImage(newImage);
    this.modalReference.dismiss();
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
