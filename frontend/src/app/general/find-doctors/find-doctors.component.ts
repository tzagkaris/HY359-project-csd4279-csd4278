import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BlocklistEntry_doctor } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';
import { OpenServiceService } from 'src/app/services/open-service.service';

@Component({
  selector: 'app-find-doctors',
  templateUrl: './find-doctors.component.html',
  styleUrls: ['./find-doctors.component.css']
})
export class FindDoctorsComponent implements OnInit {

  constructor(private openService: OpenServiceService) { }

  @Input() isPatient: boolean = false;
  @Output() buttonEvent = new EventEmitter<ButtonEmitter>();

  entries: BlocklistEntry_doctor[] = []

  ngOnInit(): void {

    this.openService.getDocs()
    .subscribe(docs => {
      if(!this.isPatient) this.entries = this.openService.docs_toBlocklist_index(docs)
      else this.entries = this.openService.docs_toBlocklist_patient(docs)
    })
  }

  buttonClicked = (ev: ButtonEmitter) => {
    console.log(ev)

    this.buttonEvent.emit(ev);
  }

}
