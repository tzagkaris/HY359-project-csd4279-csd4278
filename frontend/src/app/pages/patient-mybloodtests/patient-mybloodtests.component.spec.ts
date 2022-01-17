import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMybloodtestsComponent } from './patient-mybloodtests.component';

describe('PatientMybloodtestsComponent', () => {
  let component: PatientMybloodtestsComponent;
  let fixture: ComponentFixture<PatientMybloodtestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMybloodtestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMybloodtestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
