import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from './student.service';
import * as moment from 'moment';

@Component({
  templateUrl: './student-add.component.html'
})

export class StudentAddComponent {
  isUsernameUsed:boolean = false;
  @ViewChild('addForm') addForm:any;

  constructor(private router:Router, private studentService:StudentService) {
  }

  add() {
    let formValue = this.addForm.form.value;
    for(let k in formValue) {
      if (k === 'birthday') {
        let tmp = formValue[k].year + '-' + formValue[k].month + '-' + formValue[k].day;
        formValue[k] = moment(new Date(tmp)).format('YYYY-MM-DD');
      }
    }
    this.studentService.add(formValue).subscribe(
        (res:any)=> {
          console.log(res);
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

  cancel() {
    this.router.navigate(['/main/student']);
  }
}