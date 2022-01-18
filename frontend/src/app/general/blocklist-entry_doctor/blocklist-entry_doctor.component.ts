import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlocklistEntry_doctor } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';

@Component({
  selector: 'app-blocklist-doctor-entry',
  templateUrl: './blocklist-entry_doctor.component.html',
  styleUrls: ['./blocklist-entry_doctor.component.css']
})
export class BlocklistDoctorEntryComponent implements OnInit {

  constructor() { }

  @Output() buttonOutput= new EventEmitter<ButtonEmitter>();

  @Input() info: BlocklistEntry_doctor;
  ngOnInit(): void {

    if(this.info.actions)
      this.info.actions.forEach((element, index) => {
        if(!element.validFunc)
          /* if function provided is not "valid", propagete button press to parent */
          element.clickFunc = () => { this.buttonOutput.emit({id: this.info.id, buttonIndex: index})}
      });
  }

}
