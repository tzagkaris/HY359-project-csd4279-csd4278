import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPatblockComponent } from './appointment-patblock.component';

describe('AppointmentPatblockComponent', () => {
  let component: AppointmentPatblockComponent;
  let fixture: ComponentFixture<AppointmentPatblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentPatblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPatblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
