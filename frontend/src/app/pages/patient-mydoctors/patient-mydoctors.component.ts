import { Component, OnInit } from '@angular/core';
import { doctor } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';
import { NavBundle } from 'src/app/interfaces/nav-bundle';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-patient-mydoctors',
  templateUrl: './patient-mydoctors.component.html',
  styleUrls: ['./patient-mydoctors.component.css']
})
export class PatientMydoctorsComponent implements OnInit {

  constructor(private _sn: StatefulNavigationService) { }

  navBarBundle: NavBundle = {
    tag: 'Patient Panel',
    links: [
      {tag: 'My Bloodtests', redirectTo: '/patient/mybloodtests', selected: false},
      {tag: 'My Doctors', redirectTo: '/patient/mydoctors', selected: true},
      {tag: 'Find Doctors', redirectTo: '/patient/index', selected: false},
    ]
  }

  selectedDoctor: doctor;

  onOptionClicked(ev: ButtonEmitter) {

  }

  ngOnInit(): void {
    this.selectedDoctor = this._sn.getSavedDoc()
  }
}
