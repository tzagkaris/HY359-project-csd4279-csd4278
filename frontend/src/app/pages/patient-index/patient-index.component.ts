import { Component, OnInit } from '@angular/core';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';
import { NavBundle } from 'src/app/interfaces/nav-bundle';

@Component({
  selector: 'app-patient-index',
  templateUrl: './patient-index.component.html',
  styleUrls: ['./patient-index.component.css']
})
export class PatientIndexComponent implements OnInit {

  constructor() { }

  navBarBundle: NavBundle = {
    tag: 'Patient Panel',
    links: [
      {tag: 'My Bloodtests', redirectTo: '/patient/blootests'},
      {tag: 'My Doctors', redirectTo: '/patient/mydoctors'},
      {tag: 'Find Doctors', redirectTo: '/patient/index'},
    ]
  }

  onOptionClicked(ev: ButtonEmitter) {
    console.log('Got: ', ev);
  }

  ngOnInit(): void {
  }

}
