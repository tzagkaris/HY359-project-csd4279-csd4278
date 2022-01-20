import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavBundle } from 'src/app/interfaces/nav-bundle';

@Component({
  selector: 'app-patient-mybloodtests',
  templateUrl: './patient-mybloodtests.component.html',
  styleUrls: ['./patient-mybloodtests.component.css']
})
export class PatientMybloodtestsComponent implements OnInit {

  constructor() { }

  navBarBundle: NavBundle = {
    tag: 'Patient Panel',
    links: [
      {tag: 'My Bloodtests', redirectTo: '/patient/mybloodtests'},
      {tag: 'My Doctors', redirectTo: '/patient/mydoctors'},
      {tag: 'Find Doctors', redirectTo: '/patient/index'},
    ]
  }

  isGraphSelected: boolean = false;
  ratingSelector = new FormControl('Iron');

  ngOnInit(): void {

  }

  selectGraph() {
    this.isGraphSelected = true;
  }

  selectList() {
    this.isGraphSelected = false;
  }
}
