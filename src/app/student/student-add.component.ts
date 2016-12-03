import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './student-add.component.html'
})

export class StudentAddComponent {
  constructor(private router:Router) {

  }

  cancel() {
    this.router.navigate(['/main/student']);
  }
}