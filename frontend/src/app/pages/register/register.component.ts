import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  isDoctor: boolean = false;

  ngOnInit(): void {
  }

  toggleMoreRegOptions= () => {
    this.isDoctor = !this.isDoctor;
  }
}
