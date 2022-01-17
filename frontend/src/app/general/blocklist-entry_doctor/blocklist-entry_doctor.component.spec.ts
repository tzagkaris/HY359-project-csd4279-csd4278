import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocklistDoctorEntryComponent } from './blocklist-entry_doctor.component';

describe('BlocklistEntryComponent', () => {
  let component: BlocklistDoctorEntryComponent;
  let fixture: ComponentFixture<BlocklistDoctorEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocklistDoctorEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklistDoctorEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
