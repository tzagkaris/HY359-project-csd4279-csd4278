import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { doctor } from 'src/app/interfaces/blocklist-entry';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit, OnDestroy {

  constructor(private _sn: StatefulNavigationService, private acRoute: ActivatedRoute) { }

  doctor: doctor = {
    _id: 0,
    username: "",
    firstname: "Polling data...",
    lastname: "",
    birthdate: "",
    gender: "",
    amka: "",
    country: "",
    city: "",
    address: "",
    lat: 0,
    lon: 0,
    telephone: "",
    height: 0,
    weight: 0,
    blooddonor: 0,
    bloodtype: "",
    specialty: "",
    doctor_info: "",
    certified: 0

  };

  ngOnInit(): void {

    if(this._sn.checkIfSaved())
      this.doctor = this._sn.getSavedDoc()

  }

  ngOnDestroy(): void {

  }

}
