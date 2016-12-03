import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './student-add.component.html'
})

export class StudentAddComponent {
  isUsernameUsed:boolean = false;
  @ViewChild('addForm') addForm:any;

  constructor(private router:Router) {
  }

  add() {
    console.log(this.addForm.form.value);
  }

  cancel() {
    this.router.navigate(['/main/student']);
  }
}