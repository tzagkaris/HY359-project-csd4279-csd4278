import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBundle } from 'src/app/interfaces/nav-bundle';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private _router: Router) { }

  @Input() navBundle: NavBundle;

  ngOnInit(): void {
  }

  navigate(to: string) {
    this._router.navigateByUrl(to);
  }

  logout() {

    localStorage.removeItem('accountType')
    localStorage.removeItem('token')

    this._router.navigateByUrl('/index');
  }

}
