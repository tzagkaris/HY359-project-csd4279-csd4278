import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocklistEntryPatientComponent } from './blocklist-entry-patient.component';

describe('BlocklistEntryPatientComponent', () => {
  let component: BlocklistEntryPatientComponent;
  let fixture: ComponentFixture<BlocklistEntryPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocklistEntryPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklistEntryPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
