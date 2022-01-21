import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from '../interfaces/appointment';
import { patient } from '../interfaces/blocklist-entry';
import { Bloodtest } from '../interfaces/bloodtest';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  host: string = '';

  constructor(private http: HttpClient) {
    this.host = environment.backend_host + '/api/doctor';
  }

  getMyPatients() {

    return this.http.get<patient[]>(this.host + '/patients');
  }

  getAppointments() {

    return this.http.get<Appointment[]>(this.host + '/appointments');
  }

  setNewAppointmentState(newState: string, ap_id: number) {

    return this.http.post(this.host + '/appointment', {newState: newState, appointment_id: ap_id});
  }

  getBloodtests(p_id: number) {

    return this.http.get<Bloodtest[]>(this.host + `/${p_id}/bloodtests`);
  }

  addTreatment(treatment: any, p_id: number, b_id: number) {

    return this.http.put(this.host + `/${p_id}/${b_id}/treatment`, treatment)
  }

  getChat(p_id: number) {

    return this.http.get<Message[]>(this.host + `/${p_id}/chat`)
  }
}
