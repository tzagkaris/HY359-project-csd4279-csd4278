import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { StrDate } from 'src/app/interfaces/appointment';
import { Bloodtest, BloodtestBlock } from 'src/app/interfaces/bloodtest';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';


@Component({
  selector: 'app-graph-bloodtests',
  templateUrl: './graph-bloodtests.component.html',
  styleUrls: ['./graph-bloodtests.component.css']
})
export class GraphBloodtestsComponent implements OnInit , OnChanges{

  constructor(private sn: StatefulNavigationService, private ps: PatientService, private ds: DoctorService) { }

  @Input() selectedRating: string = 'iron';

  @Input() view: string = 'patient';
  bloodTests: Bloodtest[] = []
  bloodTestGraphBlocks: any = []
  line = ChartType.Line;

  colNames = ['Date', 'Reading']

  ngOnInit(): void {

    let ac = localStorage.getItem('accountType');
    if(ac == null) return

    this.view = ac;
    if(this.view == 'patient') {
      this.initPatient();
      return;
    }

    this.initDoctor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.selectedRating.firstChange) return;
    this.selectedRating = changes.selectedRating.currentValue;
    this.updateRatings();
  }

  initPatient() {

    this.ps.getBloodtests().subscribe(res => {
      this.bloodTests = res;
      this.createData();
    })
  }

  initDoctor() {
    let pat = this.sn.getSavedPat()
    this.ds.getBloodtests(pat._id).subscribe(r => {
      this.bloodTests = r;
      this.createData();
      this.saveLatest();
    })
  }

  createData() {

    if(this.bloodTestGraphBlocks.length) return;

    this.bloodTests = this.bloodTests.sort((a, b) => {
      let pa = this.parseDate(a.date)
      let pb = this.parseDate(b.date)
      return this.cmpDates(pa, pb);
    })

    /* add the labels */
    /* this.bloodTestGraphBlocks.push(
       [ 'Date Condacted', 'Reading Value']
    ) */

   /* add iron values as default */
   this.bloodTests.forEach(bt => {
    this.bloodTestGraphBlocks.push(
      [ bt.date.split('T')[0], bt.iron ]
    )
  })
  }

  updateRatings() {
    this.bloodTestGraphBlocks = []

    this.bloodTests = this.bloodTests.sort((a, b) => {
      let pa = this.parseDate(a.date)
      let pb = this.parseDate(b.date)
      return this.cmpDates(pa, pb);
    })

    /* add the labels */
    /* this.bloodTestGraphBlocks.push(
      [ 'Date Condacted', 'Reading Value']
   ) */

     /* add values based on selected */
     this.bloodTests.forEach(bt => {

      switch(this.selectedRating) {
      case 'iron':
        this.bloodTestGraphBlocks.push(
          [ bt.date.split('T')[0], bt.iron ]
        )
        break;
      case 'blood_sugar':
        this.bloodTestGraphBlocks.push(
          [ bt.date.split('T')[0], bt.blood_sugar ]
        )
        break;
      case 'vitamin_b12':
        this.bloodTestGraphBlocks.push(
          [ bt.date.split('T')[0], bt.vitamin_b12 ]
        )
        break;
      case 'vitamin_d3':
        this.bloodTestGraphBlocks.push(
          [ bt.date.split('T')[0], bt.vitamin_d3 ]
        )
        break;
      }
    })
  }


  parseDate(dateStr: string): StrDate {
    /* year month day */
    let tok = dateStr.split('-');
    let year = tok[0]
    let month = tok[1]
    let day = tok[2]

    return {year: parseInt(year), month: parseInt(month), day: parseInt(day)}
  }

  cmpDates(d1: StrDate, d2: StrDate) {

    if(d1.year > d2.year) return -1;
    if(d1.year == d2.year && d1.month > d2.month) return -1;
    if(d1.year == d2.year && d1.month == d2.month && d1.day < d2.day) return -1;

    return 1;
  }

  saveLatest() {

    let lastBloodtest = this.bloodTests.sort((a, b) => {
      if(a._id > b._id) return -1;

      return 1;
    })[0]

    this.sn.setLastBloodtest(lastBloodtest);
  }

  onError(ev: any) {
  }
}
