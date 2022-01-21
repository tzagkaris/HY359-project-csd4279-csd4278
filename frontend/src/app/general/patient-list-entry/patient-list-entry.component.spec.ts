import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListEntryComponent } from './patient-list-entry.component';

describe('PatientListEntryComponent', () => {
  let component: PatientListEntryComponent;
  let fixture: ComponentFixture<PatientListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
