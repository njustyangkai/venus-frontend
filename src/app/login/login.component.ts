import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {
  width:number;
  height:number;

  @ViewChild('loginForm') loginForm:any;

  constructor(private router:Router) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  login() {
    this.router.navigate(['/main']);
  }
}
