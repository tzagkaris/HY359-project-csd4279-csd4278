import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { doctor } from '../interfaces/blocklist-entry';

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

}
