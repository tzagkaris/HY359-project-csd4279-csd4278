import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment, AppointmentBlock } from 'src/app/interfaces/appointment';
import { DoctorService } from 'src/app/services/doctor.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-inc-appointments',
  templateUrl: './inc-appointments.component.html',
  styleUrls: ['./inc-appointments.component.css']
})
export class IncAppointmentsComponent implements OnInit {

  constructor(private ds: DoctorService, private router: Router, private sn: StatefulNavigationService) { }

  @Input() filter_id: number = 0;
  appointments: Appointment[] = []
  appBlocks: AppointmentBlock[] = []

  ngOnInit(): void {

    this.ds.getAppointments().subscribe(r => {
      this.appointments = r;
      if(this.filter_id != 0) {
        this.appointments = this.appointments.filter(r => r.patient_id == this.filter_id)
      }

      this.generateAppBlocks()
    }, er=> console.log(er))
  }

  generateAppBlocks() {

    this.appointments.forEach(ap => {
      this.appBlocks.push({
        ap: ap,
        actions: []
      })

      if(ap.state == 'booked') this.appBlocks[this.appBlocks.length - 1].actions.push(
        {text: 'More', colorClass: "", clickFunc: () => {

          this.sn.setSelectedAppointment(ap);
          this.router.navigateByUrl(`/info/appointment/${ap._id}`)
        }, validFunc: true},

        {text: 'Cancel', colorClass: "button-red", clickFunc: () => {

          this.ds.setNewAppointmentState('cancelled', ap._id).subscribe(r => {
            let url = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([url]);
            })
          }, er => console.log(er))
        }, validFunc: true}
      )
    })
  }

}
