import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { doctor } from '../interfaces/blocklist-entry';

export interface LoginCreds {

  username: string,
  password: string
}

export interface LoginResp {

  token: string,
  accountType: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpOpenService {

  private _host = 'this will be replaced with the backend api root ip'

  constructor(private _http: HttpClient) {
    this._host = environment.backend_host + '/api/open';
  }

  login(creds: LoginCreds) {

    return this._http.post<LoginResp>(this._host + '/login', creds);
  }

  fetchCertified() {

    return this._http.get<doctor[]>(this._host  + '/certified');
  }
}
