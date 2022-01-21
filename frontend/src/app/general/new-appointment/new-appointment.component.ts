import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {

  constructor(private ds: DoctorService) { }

  isEnabled: boolean = true;

  appointmentGroup = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
    duration: new FormControl(''),
    price: new FormControl(''),
  })

  ngOnInit(): void {
  }

  onSubmit(buttonDiv: HTMLDivElement, button:HTMLButtonElement) {

    if(!this.isEnabled) return;

    let newApp = this.appointmentGroup.value;

    let toSend = {
      date: `${newApp.date}T${newApp.time}:00Z`,
      duration: newApp.duration,
      price: newApp.price
    }

    this.ds.addAppointment(toSend).subscribe(r => {

      button.innerText = "Added"
      buttonDiv.classList.remove('button-green')

      setTimeout(() => {
        button.innerText = "Post"
        buttonDiv.classList.add('button-green')
      }, 5000)
    },er => {
      console.log(er)
      button.innerText = "Error"
      buttonDiv.classList.remove('button-green')
      buttonDiv.classList.add('button-red')

      setTimeout(() => {
        button.innerText = "Post"
        buttonDiv.classList.add('button-green')
        buttonDiv.classList.remove('button-red')
      }, 5000)
    })
  }
}
