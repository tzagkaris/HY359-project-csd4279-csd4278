import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentBlock, StrDate } from 'src/app/interfaces/appointment';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit {

  constructor(private ps: PatientService) { }

  aps: Appointment[] = [];
  ap_blocks: AppointmentBlock[] = [];

  ngOnInit(): void {

    this.ps.getMyAppointments().subscribe(r => {
      this.aps = r;
      this.generateApBlocks();
    },er => console.log(er))
  }

  generateApBlocks() {

    /* from patient's view */
    this.aps.forEach(ap => {
      this.ap_blocks.push({
        ap: ap,
        actions: []
      })
    })

    this.ap_blocks.sort((a, b) => {
      let pa = this.parseDate(a.ap.date)
      let pb = this.parseDate(a.ap.date)

      return this.cmpDates(pa, pb)
    })

  }


  parseDate(dateStr: string): StrDate {
    /* year month day */
    let tok = dateStr.split('-');
    let year = tok[0]
    let month = tok[1]
    let day = tok[2]

    return {year: parseInt(year), month: parseInt(month), day: parseInt(day)}
  }

  cmpDates(d1: StrDate, d2: StrDate) {

    if(d1.year > d2.year) return 0;
    if(d1.year == d2.year && d1.month > d2.month) return 0;
    if(d1.year == d2.year && d1.month == d2.month && d1.day < d2.day) return 0;

    return 1;
  }

}
