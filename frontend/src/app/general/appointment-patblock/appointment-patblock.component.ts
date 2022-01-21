import { Component, Input, OnInit } from '@angular/core';
import { patAppBlock } from 'src/app/interfaces/blocklist-entry';

@Component({
  selector: 'app-appointment-patblock',
  templateUrl: './appointment-patblock.component.html',
  styleUrls: ['./appointment-patblock.component.css']
})
export class AppointmentPatblockComponent implements OnInit {

  constructor() { }

  @Input() patApp: patAppBlock;

  ngOnInit(): void {

    if(this.patApp.actions.length)
      this.patApp.actions[this.patApp.actions.length - 1].colorClass +=" btn-last"
  }

}
