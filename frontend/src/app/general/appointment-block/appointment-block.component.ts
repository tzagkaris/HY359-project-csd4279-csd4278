import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Appointment, AppointmentBlock } from 'src/app/interfaces/appointment';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-appointment-block',
  templateUrl: './appointment-block.component.html',
  styleUrls: ['./appointment-block.component.css']
})
export class AppointmentBlockComponent implements OnInit {

  constructor(private ps: PatientService) { }

  @Input() app: AppointmentBlock;

  ngOnInit(): void {

    this.app.actions.forEach(ac => {
      if(!ac.validFunc) {
        ac.clickFunc = () => {
          this.ps.bookAppointment(this.app.ap.doctor_id, this.app.ap._id)
          .subscribe( res => {
            ac.text = 'Booked'
            ac.colorClass = 'button-gray btn-last'
          }, er => console.log(er))
        }
      }
    })

  }

  bookAppointment() {



  }

}
