import { Component, Input, OnInit } from '@angular/core';
import { patBlock } from 'src/app/interfaces/blocklist-entry';

@Component({
  selector: 'app-patient-list-entry',
  templateUrl: './patient-list-entry.component.html',
  styleUrls: ['./patient-list-entry.component.css']
})
export class PatientListEntryComponent implements OnInit {

  @Input() info: patBlock;

  constructor() { }

  ngOnInit(): void {
  }

}
