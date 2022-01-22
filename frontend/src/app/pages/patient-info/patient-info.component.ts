import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { patient } from 'src/app/interfaces/blocklist-entry';
import { DoctorService } from 'src/app/services/doctor.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  isGraphSelected: boolean = false;
  ratingSelector = new FormControl('Iron');

  selectGraph() {
    this.isGraphSelected = true;
  }

  selectList() {
    this.isGraphSelected = false;
  }

  constructor(private sn: StatefulNavigationService, private ds: DoctorService) { }

  patient: patient;

  ngOnInit(): void {
    this.patient = this.sn.getSavedPat();

    this.ds.readMessages(this.patient._id).subscribe(r => { console.log(r)}, er=> {/* console.log(er) */})
  }

}
