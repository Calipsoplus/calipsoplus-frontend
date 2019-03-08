import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { NewContainerImageFormComponent } from './new-container-image-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CalipsoImage} from '../../calipso-image';
import {By} from '@angular/platform-browser';


describe('NewContainerImageFormComponent', () => {
  let component: NewContainerImageFormComponent;
  let fixture: ComponentFixture<NewContainerImageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ NewContainerImageFormComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContainerImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should create default container image to be edited', () => {
  //   expect(component.model).not.toBeNull();
  // });

  // it('should change image name using html form', () => {
  //   fixture = TestBed.createComponent(NewContainerImageFormComponent);
  //   fixture.detectChanges();
  //   const containerForm = fixture.componentInstance.containerForm;
  //
  //   expect(containerForm.valid).toBe(false);
  //   expect(containerForm.get('image')).not.toBeNull('Form should have a `image` field');
  //
  //   const nativeElement = fixture.nativeElement;
  //   const button = nativeElement.querySelector('button');
  //   expect(button.getAttribute('disabled')).not.toBeNull('Your submit button should be disabled if the form is invalid');
  //
  //   const login = nativeElement.querySelector('#publicName');
  //   expect(login).not.toBeNull('Your template should have an input for the login');
  //   // login.value = 'Cédric';
  //   // login.dispatchEvent(new Event('input'));
  //
  //   fixture.detectChanges();
  //
  //   expect(button.getAttribute('disabled')).toBeNull('Your submit button should not be disabled if the form is invalid');
  //
  // });
});
