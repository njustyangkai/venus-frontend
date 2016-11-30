import { Component } from '@angular/core';

@Component({
  selector: 'px-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  username:string;

  constructor() {
    this.username = window.localStorage.getItem('username');
  }
}