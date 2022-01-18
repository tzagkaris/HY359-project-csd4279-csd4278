import { Component, OnInit } from '@angular/core';
import { BlocklistEntry_doctor, BlocklistEntry_patient, doctor, patient } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';
import { NavBundle } from 'src/app/interfaces/nav-bundle';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _admin: AdminService) { }

  navBarBundle: NavBundle = {
    tag: "Admin Panel",
    links: [
      {tag: "Dashboard", redirectTo: "/admin"}
    ]
  }

  doctors: doctor[] = [];
  patients: patient[] = [];

  blocklistDoctors: BlocklistEntry_doctor[] = [];
  blocklistPatients: BlocklistEntry_patient[] = [];

  ngOnInit(): void {

    this._admin.getUsers()
    .subscribe(list => {
      this.doctors = list.doctors;
      this.patients = list.patients;

      this.blocklistDoctors = this._admin.to_blocklistDoctors(this.doctors);
      this.blocklistPatients = this._admin.to_blocklistPatients(this.patients);
    }, er => {

      /* could add a cool notification */
      console.log(er);
    })
  }


  buttonClicked = (ev: ButtonEmitter) => {
    console.log(ev)
  }

}
