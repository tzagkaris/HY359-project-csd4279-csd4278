import { Component, OnInit } from '@angular/core';
import { NavBundle } from 'src/app/interfaces/nav-bundle';

@Component({
  selector: 'app-doctor-index',
  templateUrl: './doctor-index.component.html',
  styleUrls: ['./doctor-index.component.css']
})
export class DoctorIndexComponent implements OnInit {

  constructor() { }

  navBarBundle: NavBundle = {
    tag: 'Doctor\'s Panel',
    links: []
  }

  ngOnInit(): void {
  }

}
