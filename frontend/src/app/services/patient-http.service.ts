import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from '../interfaces/appointment';
import { doctor, patient } from '../interfaces/blocklist-entry';
import { Bloodtest, Treatment } from '../interfaces/bloodtest';
import { Message } from '../interfaces/message';

export interface doc_id {
  doctor_id: number
}

@Injectable({
  providedIn: 'root'
})
export class PatientHttpService {

  host: string = ""

  constructor(private http: HttpClient) {
    this.host = environment.backend_host + '/api/patient';
   }

   getAppointments(doc_id: number) {

    return this.http.get<Appointment[]>(this.host + `/${doc_id}/appointments`);
   }

   bookAppointment(doc_id:number, app_id:number) {

    return this.http.post(this.host + `/${doc_id}/${app_id}/book`, {});
   }

   getChat(doc_id: number) {

    return this.http.get<Message[]>(this.host + `/${doc_id}/chat`);
   }

   postMessage(msg: any) {

    return this.http.put(this.host + `/${msg.doctor_id}/chat`, msg);
   }

   getMyDoctors() {

    return this.http.get<doctor[]>(this.host + '/doctors')
   }

   addBloodtest(bloodtest: any) {

    return this.http.put(this.host + '/bloodtest', bloodtest);
   }

   getBloodtests() {

    return this.http.get<Bloodtest[]>(this.host + '/bloodtest');
   }

   getMyAppointments() {

    return this.http.get<Appointment[]>(this.host + '/appointments');
   }

   getTreatments() {

    return this.http.get<Treatment[]>(this.host + '/treatments');
   }

   getMyInfo() {

    return this.http.get<patient>(this.host +'/info');
   }

   getNewMessageDocIds() {

    return this.http.get<doc_id[]>(this.host + '/chat/new');
   }

   readMessages(d_id:number) {

    return this.http.post(this.host + `/${d_id}/chat`, {});
   }

}
