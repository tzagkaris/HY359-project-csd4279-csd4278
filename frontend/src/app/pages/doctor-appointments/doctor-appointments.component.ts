import { Component, OnInit } from '@angular/core';
import { NavBundle } from 'src/app/interfaces/nav-bundle';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

  constructor() { }

  navBarBundle: NavBundle = {
    tag: 'Doctor\'s Panel',
    links: [
      {tag: 'My Appointments', redirectTo: '/doctor/appointments', selected: true},
      {tag: 'My Patients', redirectTo: '/doctor/index', selected: false},
    ]
  }

  ngOnInit(): void {
  }

}
