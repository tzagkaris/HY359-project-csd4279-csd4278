import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { patBlock, patient } from 'src/app/interfaces/blocklist-entry';
import { DoctorService } from 'src/app/services/doctor.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

interface p_id {
  patient_id: number
}

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css']
})
export class MyPatientsComponent implements OnInit {

  constructor(private ds: DoctorService, private router: Router, private sn: StatefulNavigationService) { }

  patients: patient[] = [];
  patBlocks: patBlock[] = [];
  ids: p_id[] = [];

  ngOnInit(): void {

    this.ds.getMyPatients().subscribe(res => {
      this.patients = res;

      this.ds.getNewMessagePIds().subscribe(r => {
        this.ids = r;
        this.toblocklist()
      }, er => {/* console.log(er) */})

    }, er => {/* console.log(er) */})
  }

  toblocklist() {

    this.patients.forEach(p => {

      let s = this.ids.filter(a => a.patient_id == p._id)

      this.patBlocks.push({
        pat: p,
        hasMessage: !!s.length,
        actions: [
          {text: "More", colorClass: "", clickFunc: () => {
            this.sn.setSelectedPatient(p);
            this.router.navigateByUrl(`/info/patient/${p._id}`)
          }, validFunc: true}
        ]
      })
    })
  }

}
