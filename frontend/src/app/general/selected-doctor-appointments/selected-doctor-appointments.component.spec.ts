import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDoctorAppointmentsComponent } from './selected-doctor-appointments.component';

describe('SelectedDoctorAppointmentsComponent', () => {
  let component: SelectedDoctorAppointmentsComponent;
  let fixture: ComponentFixture<SelectedDoctorAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedDoctorAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedDoctorAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
