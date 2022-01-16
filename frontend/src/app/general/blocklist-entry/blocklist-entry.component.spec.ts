import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocklistEntryComponent } from './blocklist-entry.component';

describe('BlocklistEntryComponent', () => {
  let component: BlocklistEntryComponent;
  let fixture: ComponentFixture<BlocklistEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocklistEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklistEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
