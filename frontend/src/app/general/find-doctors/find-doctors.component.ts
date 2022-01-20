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

  ngOnInit(): void {

    if(this.myDoctors) {
      this._ps.getMyDoctors().subscribe(d => {
        this.docs = d;

        this.entries = this.openService.docs_toBlocklist_patient(d)
      })
    }
    else
      this.openService.getDocs()
      .subscribe(docs => {
        this.docs = docs;

        if(!this.isPatient) this.entries = this.openService.docs_toBlocklist_index(docs)
        else this.entries = this.openService.docs_toBlocklist_patient(docs)

      })
  }

  buttonClicked = (ev: ButtonEmitter) => {
    /* if button clicked was "More" */
    if(ev.desc == "More") this.handleMoreButtonClick(ev);
  }

  handleMoreButtonClick = (ev: ButtonEmitter) => {
    /* navigate to doctors-info page, where his appointments can be seen */
    let clickedDoc = this.docs.filter(d => d._id == ev.id);

    this._sn.setSelectedDoctor(clickedDoc[0])
    this.buttonEvent.emit(ev);
    this._router.navigateByUrl(`/info/doctor/${clickedDoc[0]._id}`)
  }

}
