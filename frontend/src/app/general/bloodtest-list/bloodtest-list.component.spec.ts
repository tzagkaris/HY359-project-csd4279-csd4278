import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodtestListComponent } from './bloodtest-list.component';

describe('BloodtestListComponent', () => {
  let component: BloodtestListComponent;
  let fixture: ComponentFixture<BloodtestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodtestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodtestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
