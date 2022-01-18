import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMydoctorsComponent } from './patient-mydoctors.component';

describe('PatientMydoctorsComponent', () => {
  let component: PatientMydoctorsComponent;
  let fixture: ComponentFixture<PatientMydoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMydoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMydoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
