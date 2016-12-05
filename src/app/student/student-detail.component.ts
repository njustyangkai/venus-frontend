import { Component } from '@angular/core';
import { StudentService } from './student.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './student-detail.component.html'
})

export class StudentDetailComponent {
  currentData:any;

  constructor(private studentService:StudentService,
              private router:Router) {
    this.currentData = this.studentService.currentData;
  }

  gotoEdit() {
    this.router.navigate(['/main/editStudent']);
  }
}