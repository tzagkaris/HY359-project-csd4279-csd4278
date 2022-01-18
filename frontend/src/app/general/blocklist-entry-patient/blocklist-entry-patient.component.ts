import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlocklistEntry_patient } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';

@Component({
  selector: 'app-blocklist-patient-entry',
  templateUrl: './blocklist-entry-patient.component.html',
  styleUrls: ['./blocklist-entry-patient.component.css']
})
export class BlocklistEntryPatientComponent implements OnInit {

  constructor() { }

  @Input() info: BlocklistEntry_patient;
  @Output() buttonOutput= new EventEmitter<ButtonEmitter>();

  ngOnInit(): void {

    if(this.info.actions)
    this.info.actions.forEach((element, index) => {
      if(!element.validFunc)
        /* if function provided is not "valid", propagete button press to parent */
        element.clickFunc = () => { this.buttonOutput.emit({id: this.info.id, buttonIndex: index})}
    });
  }

}
