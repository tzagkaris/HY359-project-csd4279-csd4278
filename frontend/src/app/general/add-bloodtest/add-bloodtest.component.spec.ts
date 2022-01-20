import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBloodtestComponent } from './add-bloodtest.component';

describe('AddBloodtestComponent', () => {
  let component: AddBloodtestComponent;
  let fixture: ComponentFixture<AddBloodtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBloodtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBloodtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
