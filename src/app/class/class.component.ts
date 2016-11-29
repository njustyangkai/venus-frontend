import { Component } from '@angular/core';

@Component({
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})

export class ClassComponent {
  clocks:string[];

  constructor() {
    this.clocks = [
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
      '22:00'
    ];
  }
}
