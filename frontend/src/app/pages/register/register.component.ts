import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenServiceService } from 'src/app/services/open-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private openService: OpenServiceService, private _router: Router) { }

  isDoctor: boolean = false;

  ngOnInit(): void {
  }

  toggleMoreRegOptions= () => {
    this.isDoctor = !this.isDoctor;
  }

  registerForm = new FormGroup({

    username: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    telephone: new FormControl(''),
    lon: new FormControl(''),
    lat: new FormControl(''),
    birthdate: new FormControl(''),
    gender: new FormControl(''),
    amka: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    bloodtype: new FormControl(''),
    blooddonor: new FormControl(''),
    specialty: new FormControl(''),
    doctor_info: new FormControl(''),
  })

  onSubmit() {

    let to_send = this.registerForm.value;

    /* if specialty is empty then delete those properties in order to register a user */
    if(to_send.specialty == "" || to_send.doctor_info == "") {

      delete to_send.specialty;
      delete to_send.doctor_info;
    }

    this.openService.registerUser(to_send)
    .subscribe(res => {
      console.log(res);
      this._router.navigateByUrl('/index');
    },
    er => console.log(er)
    )
  }
}
