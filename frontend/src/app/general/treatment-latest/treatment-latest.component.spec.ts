import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentLatestComponent } from './treatment-latest.component';

describe('TreatmentLatestComponent', () => {
  let component: TreatmentLatestComponent;
  let fixture: ComponentFixture<TreatmentLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentLatestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
