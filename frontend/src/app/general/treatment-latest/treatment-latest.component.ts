import { Component, Input, OnInit } from '@angular/core';
import { doctor } from 'src/app/interfaces/blocklist-entry';
import { Treatment } from 'src/app/interfaces/bloodtest';
import { PatientHttpService } from 'src/app/services/patient-http.service';

@Component({
  selector: 'app-treatment-latest',
  templateUrl: './treatment-latest.component.html',
  styleUrls: ['./treatment-latest.component.css']
})
export class TreatmentLatestComponent implements OnInit {

  constructor(private ps: PatientHttpService) { }

  treatments: Treatment[] = [];
  latestTreatment: Treatment;

  docs: doctor[] = [];
  isDocLinked: boolean = false;
  by: string = "";

  ngOnInit(): void {

    this.ps.getTreatments().subscribe(r => {
      this.treatments = r;
      this.latestTreatment = this.treatments.sort((tra, trb) => {
        if(tra._id > trb._id) return -1;
        return 1;
      })[0]
    })

    
  }

}
