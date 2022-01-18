import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpOpenService, LoginCreds } from 'src/app/services/http-open.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterContentInit {

  constructor(private _openHttp: HttpOpenService,
      private _router: Router) { }

  usernameControl = new FormControl();
  passwordControl = new FormControl();
  isLoggedIn = false;

  @ViewChild('loginHandleRef', {static: true}) loginHandle: ElementRef;


  ngAfterContentInit(): void {

    let loginButton: HTMLDivElement = this.loginHandle.nativeElement;

    if(localStorage.getItem('accountType')) {
      this.isLoggedIn = true;
      loginButton.innerHTML = '<button>Logout</button>';
      loginButton.classList.add('button-red')
    }
  }

  tryLogin() {

    if(this.isLoggedIn) {
      this.logOut();
      return;
    }

    let creds: LoginCreds = {
      username: this.usernameControl.value,
      password: this.passwordControl.value
    }

    this._openHttp.login(creds)
    .subscribe(res => {

      if(!res.token) return;

      localStorage.setItem('token', res.token)
      localStorage.setItem('accountType', res.accountType)

      let navTo = 'index';
      if(res.accountType == "admin") navTo = '/admin';
      else if(res.accountType == "doctor") navTo = '/doctor/index';
      else if(res.accountType == "patient") navTo = '/patient/index';

      this._router.navigateByUrl(navTo);
    },
    er => {
      /* add some kind of feedback if there exists time -- will do later */
      /* console.log(er.error.error) */
      console.log("Invalid Credentials")
    })

  }

  logOut() {
    let loginButton: HTMLDivElement = this.loginHandle.nativeElement;
    this.isLoggedIn = false;

    localStorage.removeItem('accountType');
    localStorage.removeItem('token');

    loginButton.innerHTML = '<button>Login</button>';
    loginButton.classList.remove('button-red')
  }

}
