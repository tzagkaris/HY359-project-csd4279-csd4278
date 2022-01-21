import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Appointment } from 'src/app/interfaces/appointment';
import { patient } from 'src/app/interfaces/blocklist-entry';
import { Bloodtest } from 'src/app/interfaces/bloodtest';
import { DoctorService } from 'src/app/services/doctor.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.css']
})
export class AddTreatmentComponent implements OnInit {

  treatmentGroup = new FormGroup({
    date_start: new FormControl(''),
    date_end: new FormControl(''),
    medications: new FormControl(''),
    examinations: new FormControl(''),
  })

  constructor(private sn: StatefulNavigationService, private ds: DoctorService) { }

  patient: patient;
  appointment: Appointment;
  bloodtest: Bloodtest;
  isEnabled: boolean = true;

  ngOnInit(): void {

    this.patient = this.sn.getSavedPat()
    this.appointment = this.sn.getSavedAppointment()
    this.bloodtest = this.sn.getLastBloodtest()
  }

  onSubmit(buttonDiv: HTMLDivElement, button: HTMLButtonElement) {
    if(!this.isEnabled) return;
    
    let treatment = this.treatmentGroup.value;

    this.ds.addTreatment(treatment, this.patient._id, this.bloodtest._id)
    .subscribe(r => {
      this.isEnabled = false;
      buttonDiv.classList.add('button-gray')
      buttonDiv.classList.remove('button-green')
      button.innerText = 'Added'
    }, er => {
      this.isEnabled = false;
      buttonDiv.classList.add('button-red')
      buttonDiv.classList.remove('button-green')
      button.innerText = 'Error'

      setTimeout(() => {
        this.isEnabled = true;
        buttonDiv.classList.remove('button-red')
        buttonDiv.classList.add('button-green')
        button.innerText = 'Post'
      }, 5000)
    })
  }

}
