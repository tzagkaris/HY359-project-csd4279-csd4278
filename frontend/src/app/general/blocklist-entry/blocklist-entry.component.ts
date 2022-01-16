import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlocklistEntry } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';

@Component({
  selector: 'app-blocklist-entry',
  templateUrl: './blocklist-entry.component.html',
  styleUrls: ['./blocklist-entry.component.css']
})
export class BlocklistEntryComponent implements OnInit {

  constructor() { }

  @Output() buttonOutput= new EventEmitter<ButtonEmitter>();

  @Input() info: BlocklistEntry;
  @Input() isCertified: boolean = false;
  ngOnInit(): void {

    if(this.info.actions)
      this.info.actions.forEach((element, index) => {
        element.clickFunc = () => { this.buttonOutput.emit({id: this.info.id, buttonIndex: index})}
      });
  }

}
