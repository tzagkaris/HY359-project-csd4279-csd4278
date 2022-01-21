import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncAppointmentsComponent } from './inc-appointments.component';

describe('IncAppointmentsComponent', () => {
  let component: IncAppointmentsComponent;
  let fixture: ComponentFixture<IncAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
