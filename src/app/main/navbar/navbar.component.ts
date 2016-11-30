import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'px-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  username:string;

  constructor(private router:Router) {
    this.username = window.localStorage.getItem('username');
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}