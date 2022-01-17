import { Component, OnInit } from '@angular/core';
import { BlocklistEntry_doctor, BlocklistEntry_patient } from 'src/app/interfaces/blocklist-entry';
import { ButtonEmitter } from 'src/app/interfaces/button-emitter';
import { NavBundle } from 'src/app/interfaces/nav-bundle';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  navBarBundle: NavBundle = {
    tag: "Admin Panel",
    links: [
      {tag: "Dashboard", redirectTo: "/admin"}
    ]
  }

  doctors: BlocklistEntry_doctor[] = [
    {isCertified: 1, name: "Carl Johnson", location: "SomeWhere 12, Heraklion Crete, Greece", number: "+30 698 803 7929", id: 1, more: "-This is a short description used to showcase the alignment of this layout. His name is Carl Johnson from the hit video game grand theft auto san andreas.", specialty: "General Doctor",
      actions: [
        {text: "Delete", colorClass: "button button-red",clickFunc: () => {} }
      ]
    },
    {isCertified: 0, name: "Carl Johnson", location: "SomeWhere 12, Heraklion Crete, Greece", number: "+30 698 803 7929", id: 2, more: "-This is a short description used to showcase the alignment of this layout. His name is Carl Johnson from the hit video game grand theft auto san andreas.", specialty: "General Doctor",
    actions: [
      {text: "Certify", colorClass: "button button-green",clickFunc: () => {} },
      {text: "Delete", colorClass: "button button-red",clickFunc: () => {} }
    ]
  },
  ]

  patients: BlocklistEntry_patient[] = [
    {name: 'Jane Doe',location: "WhereTho 44, Heraklion Crete, Greece", number: "+30 694 412 7946", id: 1, birthdate: "1995-12-05",
    actions: [
      {text: "Delete", colorClass: "button button-red",clickFunc: () => {} }
    ]
  },
  {name: 'Lame Connor',location: "WhereTho 44, Heraklion Crete, Greece", number: "+30 694 412 7946", id: 1, birthdate: "1995-12-05",
    actions: [
      {text: "Delete", colorClass: "button button-red",clickFunc: () => {} }
    ]
  },
  {name: 'Jane Doe',location: "WhereTho 44, Heraklion Crete, Greece", number: "+30 694 412 7946", id: 1, birthdate: "1995-12-05",
  actions: [
    {text: "Delete", colorClass: "button button-red",clickFunc: () => {} }
  ]
},
{name: 'Lame Connor',location: "WhereTho 44, Heraklion Crete, Greece", number: "+30 694 412 7946", id: 1, birthdate: "1995-12-05",
  actions: [
    {text: "Delete", colorClass: "button button-red",clickFunc: () => {} }
  ]
},
  ]

  buttonClicked = (ev: ButtonEmitter) => {
    console.log(ev)
  }

  ngOnInit(): void {
  }

}
