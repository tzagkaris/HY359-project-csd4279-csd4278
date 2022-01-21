import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Appointment } from '../interfaces/appointment';
import { doctor, patient } from '../interfaces/blocklist-entry';
import { Bloodtest } from '../interfaces/bloodtest';

@Injectable({
  providedIn: 'root'
})
export class StatefulNavigationService {

  constructor(private _router: Router) { }

  private doc: doctor;

  setSelectedDoctor(doc: doctor) {

    this.doc = doc;
  }

  checkIfSaved() {

    if(this.doc) return true;
    return false;
  }

  getSavedDoc() {

    return this.doc;
  }

  private pat: patient;

  setSelectedPatient(pat: patient) {

    this.pat = pat;
  }

  checkIfSavedPat() {
    if(this.pat) return true;
    return false;
  }

  getSavedPat() {

    return this.pat;
  }

  private app: Appointment;

  setSelectedAppointment(ap: Appointment) {

    this.app = ap;
  }

  checkIfSavedApp() {
    if(this.app) return true;
    return false;
  }

  getSavedAppointment() {

    return this.app;
  }

  private bloodtest: Bloodtest;

  setLastBloodtest(bl: Bloodtest) {

    this.bloodtest = bl;
  }

  checkIfSavedBloodtest() {
    if(this.bloodtest) return true;
    return false;
  }

  getLastBloodtest() {

    return this.bloodtest;
  }

}
