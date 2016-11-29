import { Component } from '@angular/core';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {
  width:number;
  height:number;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
