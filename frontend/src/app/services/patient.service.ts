import { Injectable } from '@angular/core';
import { PatientHttpService } from './patient-http.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private ph: PatientHttpService) { }

  getAppointments(doc_id: number) {

    return this.ph.getAppointments(doc_id);
  }

  bookAppointment(doc_id: number, app_id: number) {

    return this.ph.bookAppointment(doc_id, app_id);
  }

  getChat(doc_id: number) {

    return this.ph.getChat(doc_id);
  }

  postMessage(msg: any) {

    return this.ph.postMessage(msg);
  }

  getMyDoctors() {

    return this.ph.getMyDoctors();
  }

  newBloodtest(bloodtest: any) {

    return this.ph.addBloodtest(bloodtest);
  }

  getBloodtests() {

    return this.ph.getBloodtests();
  }

  getMyAppointments() {

    return this.ph.getMyAppointments();
  }

  getMyInfo() {

    return this.ph.getMyInfo();
  }

  getNewMessageDocIds() {

    return this.ph.getNewMessageDocIds();
   }

   readMessages(d_id:number) {

    return this.ph.readMessages(d_id);
   }
}
