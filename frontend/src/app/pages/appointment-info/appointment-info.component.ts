import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Appointment } from 'src/app/interfaces/appointment';
import { patient } from 'src/app/interfaces/blocklist-entry';
import { DoctorService } from 'src/app/services/doctor.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.css']
})
export class AppointmentInfoComponent implements OnInit {

  isGraphSelected: boolean = false;
  ratingSelector = new FormControl('Iron');

  selectGraph() {
    this.isGraphSelected = true;
  }

  selectList() {
    this.isGraphSelected = false;
  }

  constructor(private sn: StatefulNavigationService, private ds: DoctorService, private location: Location) { }

  patient: patient;
  appointment: Appointment;

  ngOnInit(): void {
    this.patient = this.sn.getSavedPat();
    this.appointment = this.sn.getSavedAppointment();
  }

  onCancel() {
    this.ds.setNewAppointmentState('cancelled', this.appointment._id).subscribe(r => {
      this.location.back();
    })
  }

  onDone() {
    this.ds.setNewAppointmentState('done', this.appointment._id).subscribe(r => {
      this.location.back();
    })
  }
}
