import { Component, OnInit } from '@angular/core';
import { doctor } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';
import { NavBundle } from 'src/app/interfaces/nav-bundle';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-patient-index',
  templateUrl: './patient-index.component.html',
  styleUrls: ['./patient-index.component.css']
})
export class PatientIndexComponent implements OnInit {

  constructor(private _sn: StatefulNavigationService) { }

  navBarBundle: NavBundle = {
    tag: 'Patient Panel',
    links: [
      {tag: 'My Bloodtests', redirectTo: '/patient/mybloodtests'},
      {tag: 'My Doctors', redirectTo: '/patient/mydoctors'},
      {tag: 'Find Doctors', redirectTo: '/patient/index'},
    ]
  }

  selectedDoctor: doctor;

  onOptionClicked(ev: ButtonEmitter) {

  }

  ngOnInit(): void {
    this.selectedDoctor = this._sn.getSavedDoc()
  }

}
