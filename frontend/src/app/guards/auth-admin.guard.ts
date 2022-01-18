import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private _router: Router) {}

  canActivate() {
    if(this.isLoggedIn() && this.isAdmin()) return true;

    this._router.navigateByUrl('/index');
    return false;
  }

  isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  isAdmin() {
    return localStorage.getItem('accountType') == 'admin'
  }


}
