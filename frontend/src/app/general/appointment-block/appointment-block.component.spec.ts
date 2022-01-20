import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBlockComponent } from './appointment-block.component';

describe('AppointmentBlockComponent', () => {
  let component: AppointmentBlockComponent;
  let fixture: ComponentFixture<AppointmentBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
