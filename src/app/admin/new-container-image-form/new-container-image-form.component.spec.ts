import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { NewContainerImageFormComponent } from './new-container-image-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

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

  it('form invalid when empty', () => {
    expect(component.containerImageForm.valid).toBeFalsy();
  });

  it('public name required field validity', () => {
    const publicName = component.containerImageForm.controls['publicName'];
    const errors = publicName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('image required field validity', () => {
    const image = component.containerImageForm.controls['image'];
    const errors = image.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('protocol required field validity', () => {
    const protocol = component.containerImageForm.controls['protocol'];
    const errors = protocol.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('cpu required field validity', () => {
    const cpu = component.containerImageForm.controls['cpu'];
    const errors = cpu.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('memory required field validity', () => {
    const memory = component.containerImageForm.controls['memory'];
    const errors = memory.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('hdd required field validity', () => {
    const hdd = component.containerImageForm.controls['hdd'];
    const errors = hdd.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should require all fields to be valid before button is active', () => {
    expect(component.containerImageForm.valid).toBeFalsy();
    component.containerImageForm.controls['publicName'].setValue('new image name');
    component.containerImageForm.controls['image'].setValue('new image url');
    component.containerImageForm.controls['protocol'].setValue('RDP');
    component.containerImageForm.controls['cpu'].setValue(4);
    component.containerImageForm.controls['memory'].setValue('5G');
    component.containerImageForm.controls['hdd'].setValue('10G');
    expect(component.containerImageForm.valid).toBeFalsy();
    component.containerImageForm.controls['resource'].setValue('Docker');
    expect(component.containerImageForm.valid).toBeTruthy();
  });
});
