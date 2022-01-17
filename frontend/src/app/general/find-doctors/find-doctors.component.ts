import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BlocklistEntry_doctor } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';

@Component({
  selector: 'app-find-doctors',
  templateUrl: './find-doctors.component.html',
  styleUrls: ['./find-doctors.component.css']
})
export class FindDoctorsComponent implements OnInit {

  constructor() { }

  @Input() isPatient: boolean = false;

  entries: BlocklistEntry_doctor[] = [
    {isCertified: 1,name: "Carl Johnson", location: "SomeWhere 12, Heraklion Crete, Greece", number: "+30 698 803 7929", id: 1, more: "-This is a short description used to showcase the alignment of this layout. His name is Carl Johnson from the hit video game grand theft auto san andreas.", specialty: "General Doctor",
      actions: [
        {text: "Book", colorClass: "button",clickFunc: () => {} }
      ]
    },
    {isCertified: 1,name: "Carl Johnson", location: "SomeWhere 12, Heraklion Crete, Greece", number: "+30 698 803 7929", id: 2, more: "-This is a short description used to showcase the alignment of this layout. His name is Carl Johnson from the hit video game grand theft auto san andreas.", specialty: "General Doctor",
    actions: [
      {text: "Book", colorClass: "button",clickFunc: () => {} },
      {text: "Map", colorClass: "button button-green", clickFunc: () => {}}
    ]
  },
  ]
  ngOnInit(): void {
  }

  buttonClicked = (ev: ButtonEmitter) => {
    console.log(ev)
  }

}
