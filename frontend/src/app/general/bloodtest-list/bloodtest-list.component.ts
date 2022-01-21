import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StrDate } from 'src/app/interfaces/appointment';
import { Bloodtest, BloodtestBlock } from 'src/app/interfaces/bloodtest';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';

@Component({
  selector: 'app-bloodtest-list',
  templateUrl: './bloodtest-list.component.html',
  styleUrls: ['./bloodtest-list.component.css']
})
export class BloodtestListComponent implements OnInit, OnChanges {

  constructor(private ps: PatientService, private ds: DoctorService, private sn: StatefulNavigationService) { }

  @Input() view: string = 'patient';
  bloodTests: Bloodtest[] = []
  bloodTestBlocks: BloodtestBlock[] = []
  Math: Math = Math;
  normal = "normal";

  @Input() selectedRating: string = 'Iron';

  srcDown = "./../../../assets/arrow-down.svg"
  srcUp = "./../../../assets/arrow-up.svg"

  ngOnInit(): void {

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
    console.log(this.bloodTestBlocks)
  }

  initPatient() {

    this.ps.getBloodtests().subscribe(res => {
      this.bloodTests = res;
      this.createBlockList();
      this.updateRatings();
    })
  }

  initDoctor() {
    let pat = this.sn.getSavedPat()
    this.ds.getBloodtests(pat._id).subscribe(r => {
      this.bloodTests = r;
      this.createBlockList();
      this.updateRatings();
      this.saveLatest();
    })
  }

  createBlockList() {

    if(this.bloodTestBlocks.length) return;

    this.bloodTests.sort((a, b) => {
      let pa = this.parseDate(a.date)
      let pb = this.parseDate(b.date)
      return this.cmpDates(pa, pb);
    })

    this.bloodTests.forEach(test => {
      this.bloodTestBlocks.push({
        bt: test,
        perc: 0,
        isLower: false,
        selectedRating: 'iron',
        selectedRatingReading: test.iron,
        selectedRatingRating: test.iron_lvl,
        currentSrc: this.srcDown,
      })
    })
  }

  updateRatings() {

    this.bloodTestBlocks.forEach((elem, index) => {
      elem.selectedRating = this.selectedRating;
      switch(elem.selectedRating) {

        case 'iron':
          elem.selectedRatingRating = elem.bt.iron_lvl
          elem.selectedRatingReading = elem.bt.iron
          break;
        case 'blood_sugar':
          elem.selectedRatingRating = elem.bt.blood_sugar_lvl;
          elem.selectedRatingReading = elem.bt.blood_sugar
          break;
        case 'vitamin_b12':
          elem.selectedRatingRating = elem.bt.vitamin_b12_lvl;
          elem.selectedRatingReading = elem.bt.vitamin_b12
          break;
        case 'vitamin_d3':
          elem.selectedRatingRating = elem.bt.vitamin_d3_lvl;
          elem.selectedRatingReading = elem.bt.vitamin_d3
          break;
      }

      if(!index) {
        elem.perc = 0;
        elem.isLower = false;
      }
      else {
        elem.perc = ((elem.selectedRatingReading - this.bloodTestBlocks[index - 1].selectedRatingReading) / this.bloodTestBlocks[index - 1].selectedRatingReading) * 100
        elem.isLower = elem.perc < 0;
        elem.currentSrc = elem.isLower ? this.srcDown : this.srcUp
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

    if(d1.year > d2.year) return 0;
    if(d1.year == d2.year && d1.month > d2.month) return 0;
    if(d1.year == d2.year && d1.month == d2.month && d1.day < d2.day) return 0;

    return 1;
  }

  saveLatest() {

    let lastBloodtest = this.bloodTests.sort((a, b) => {
      if(a._id > b._id) return -1;

      return 1;
    })[0]

    this.sn.setLastBloodtest(lastBloodtest);
  }
}
