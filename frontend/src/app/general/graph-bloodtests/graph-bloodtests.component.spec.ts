import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBloodtestsComponent } from './graph-bloodtests.component';

describe('GraphBloodtestsComponent', () => {
  let component: GraphBloodtestsComponent;
  let fixture: ComponentFixture<GraphBloodtestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphBloodtestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBloodtestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
