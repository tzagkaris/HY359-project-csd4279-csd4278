import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthPatientGuard implements CanActivate {

  constructor(private _router: Router) {}

  canActivate() {
    if(this.isLoggedIn() && this.isPatient()) return true;

    this._router.navigateByUrl('/index');
    return false;
  }

  isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  isPatient() {
    return localStorage.getItem('accountType') == 'patient'
  }


}
