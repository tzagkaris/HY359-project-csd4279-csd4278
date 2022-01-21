import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-bloodtest',
  templateUrl: './add-bloodtest.component.html',
  styleUrls: ['./add-bloodtest.component.css']
})
export class AddBloodtestComponent implements OnInit {

  constructor(private _ps: PatientService, private _router: Router) { }

  isEnabled: boolean = true;

  bloodtestForm = new FormGroup({
    date: new FormControl(''),
    iron: new FormControl(''),
    blood_sugar: new FormControl(''),
    vitamin_b12: new FormControl(''),
    vitamin_d3: new FormControl(''),
  })

  ngOnInit(): void {
  }

  onSubmit() {

    let bloodtest = this.bloodtestForm.value;
    this._ps.newBloodtest(bloodtest).subscribe(res => {

      this.isEnabled = false;

      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate(['/patient/mybloodtests']);
        this.isEnabled = true;
      });

    })
  }

}
