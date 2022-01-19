import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { doctor, patient } from '../interfaces/blocklist-entry';

export interface UsersArray {
  doctors: doctor[],
  patients: patient[]
}

@Injectable({
  providedIn: 'root'
})
export class HttpAdminService {

  private _host = 'this will be replaced with the backend api root ip'

  constructor(private _http: HttpClient) {
    this._host = environment.backend_host + '/api/admin';
  }

  getUsers() {

    return this._http.get<UsersArray>(this._host + '/users');
  }

  removeUser(amka: string) {

    return this._http.delete(this._host +`/users/${amka}`);
  }

  certifyDoc(amka: string) {

    return this._http.post(this._host +'/certify', {amka: amka});
  }

}
