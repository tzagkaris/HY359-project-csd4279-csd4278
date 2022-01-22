import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BlocklistEntry_doctor, doctor } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';
import { OpenServiceService } from 'src/app/services/open-service.service';
import { PatientService } from 'src/app/services/patient.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-find-doctors',
  templateUrl: './find-doctors.component.html',
  styleUrls: ['./find-doctors.component.css']
})
export class FindDoctorsComponent implements OnInit {

  constructor(private openService: OpenServiceService,
     private _sn: StatefulNavigationService, private _router: Router, private _ps: PatientService ) { }

  @Input() isPatient: boolean = false;
  @Input() topText: string = 'Certified Doctors:'
  @Input() myDoctors: boolean = false;
  @Output() buttonEvent = new EventEmitter<ButtonEmitter>();

  entries: BlocklistEntry_doctor[] = []
  docs: doctor[] = [];
  isMapClicked: boolean = false;
  center = {
    lat: 35.33728205677397,
    lng: 25.137104655260956
  }
  patMarker = {
    lat:35.33728205677397,
    lng:25.137104655260956
  }

  distance: string = "0"
  duration: string = "0"

  title= "Medical Office"
  titlePat= "Your place"

  ngOnInit(): void {

    if(this.myDoctors) {
      this._ps.getMyDoctors().subscribe(d => {
        this.docs = d;

        this.entries = this.openService.docs_toBlocklist_patient(d)

        this._ps.getNewMessageDocIds().subscribe(r => {

          this.entries.forEach(e => {

            let hasMsges = !!((r.filter(a => a.doctor_id == e.id)).length);
            e.hasMessages = hasMsges;
          })
        })

      })
    }
    else
      this.openService.getDocs()
      .subscribe(docs => {
        this.docs = docs;

        if(!this.isPatient) this.entries = this.openService.docs_toBlocklist_index(docs)
        else {
          this.entries = this.openService.docs_toBlocklist_patient(docs)

          this._ps.getNewMessageDocIds().subscribe(r => {

            this.entries.forEach(e => {

              let hasMsges = !!((r.filter(a => a.doctor_id == e.id)).length);
              e.hasMessages = hasMsges;
            })
          })


        }
      })
  }

  buttonClicked = (ev: ButtonEmitter) => {
    /* if button clicked was "More" */
    if(ev.desc == "More") this.handleMoreButtonClick(ev);
    if(ev.desc == 'Map') this.handleMapButton(ev);
  }

  handleMapButton(ev: ButtonEmitter) {
    let clickedDoc = this.docs.filter(d => d._id == ev.id)[0];
    this._sn.setSelectedDoctor(clickedDoc)

    this.center = {
      lat: clickedDoc.lat,
      lng: clickedDoc.lon
    }


    /* if patient is logged in, show distance also */
    if(this.isPatient) {
      this._ps.getMyInfo()
      .subscribe(r => {
        this._sn.setSelectedPatient(r)
        this.patMarker = {
          lat: r.lat,
          lng: r.lon
        }
        this.calcDistance()
        this.isMapClicked = true;
      })

      return;
    }

    this.isMapClicked = true;
  }

  calcDistance() {
    let clickedDoc = this._sn.getSavedDoc()
    let pat = this._sn.getSavedPat()

    let dpos = new google.maps.LatLng(clickedDoc.lat, clickedDoc.lon);
    let ppos = new google.maps.LatLng(pat.lat, pat.lon);

    let service = new google.maps.DistanceMatrixService()

    service.getDistanceMatrix({
      origins: [ppos],
      destinations: [dpos],
      travelMode: google.maps.TravelMode.DRIVING,
    }).then(r => {
      this.distance = r.rows[0].elements[0].distance.text;
      this.duration = r.rows[0].elements[0].duration.text;
    })
/*     service.getDistanceMatrix(
      {
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: 'DRIVING',
        transitOptions: TransitOptions,
        drivingOptions: DrivingOptions,
        unitSystem: UnitSystem,
        avoidHighways: Boolean,
        avoidTolls: Boolean,
      }, callback); */

  }

  handleMoreButtonClick = (ev: ButtonEmitter) => {
    /* navigate to doctors-info page, where his appointments can be seen */
    let clickedDoc = this.docs.filter(d => d._id == ev.id);

    this._sn.setSelectedDoctor(clickedDoc[0])
    this.buttonEvent.emit(ev);
    this._router.navigateByUrl(`/info/doctor/${clickedDoc[0]._id}`)
  }

}
