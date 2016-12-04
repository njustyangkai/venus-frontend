import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from './student.service';
import * as moment from 'moment';

@Component({
  templateUrl: './student-add.component.html'
})

export class StudentAddComponent {
  isUsernameUsed:boolean = false;

  isShowSuccess:boolean = false;
  successMsg:string;

  sex:string = '男';

  @ViewChild('addForm') addForm:any;

  constructor(private router:Router, private studentService:StudentService) {
  }

  add() {
    let formValue = this.addForm.form.value;
    for (let k in formValue) {
      if (k === 'birthday') {
        let tmp = formValue[k].year + '-' + formValue[k].month + '-' + formValue[k].day;
        let date = new Date(tmp);
        formValue[k] = moment(date).format('YYYY-MM-DD');
      }
    }
    this.studentService.isUsernameUsed({username: formValue.username}).subscribe(
        (res:any)=> {
          if (res.success) {
            if (res.data) {
              this.isUsernameUsed = true;
            } else {
              this.studentService.add(formValue).subscribe(
                  (res:any)=> {
                    if (res.success) {
                      this.successMsg = '添加新学生成功。2s后返回学生列表。';
                      this.isShowSuccess = true;
                      setTimeout(()=> {
                        this.isShowSuccess = false;
                        this.router.navigate(['/main/student']);
                      }, 2000);
                    }
                  },
                  (error:any)=> {
                    console.log(error);
                  }
              );
            }
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

  cancel() {
    this.router.navigate(['/main/student']);
  }

  usernameChange(e:any) {
    this.isUsernameUsed = false;
  }
}