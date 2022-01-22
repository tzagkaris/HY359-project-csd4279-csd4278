import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment, AppointmentBlock } from 'src/app/interfaces/appointment';
import { doctor } from 'src/app/interfaces/blocklist-entry';
import { PatientService } from 'src/app/services/patient.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-selected-doctor-appointments',
  templateUrl: './selected-doctor-appointments.component.html',
  styleUrls: ['./selected-doctor-appointments.component.css']
})
export class SelectedDoctorAppointmentsComponent implements OnInit, OnDestroy {

  constructor(private _ps: PatientService, private _sn: StatefulNavigationService) { }
  appointments: Appointment[] = [];
  ap_blocks: AppointmentBlock[] = [];

  doc: doctor | undefined;

  ngOnInit(): void {

    if(this._sn.checkIfSaved()) {
      this.doc = this._sn.getSavedDoc()
      this.getAppointments()
    }

  }

  getAppointments() {
    if(!this.doc) return;
    if(this.appointments.length) return;

    if(this.doc._id != 0)
      this._ps.getAppointments(this.doc._id).subscribe(res => {
        this.appointments = res;

        this.generateApBlocks();
      },
      er => {/* console.log(er) */})
  }

  generateApBlocks() {

    /* from patient's view */
    this.appointments.forEach(ap => {
      this.ap_blocks.push({
        ap: ap,
        actions:[
          {text: "Book", colorClass: "btn-last", clickFunc: () => {}, validFunc: false},
        ]
      })
    })

  }

  ngOnDestroy(): void {
  }

}
