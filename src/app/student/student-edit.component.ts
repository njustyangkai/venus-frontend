import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from './student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  templateUrl: './student-edit.component.html'
})

export class StudentEditComponent implements OnInit {
  isShowSuccess:boolean = false;
  successMsg:string;

  currentData:any;

  @ViewChild('modal1_template') modal1_template:any;
  modal1:any;

  constructor(private studentService:StudentService,
              private modalService:NgbModal,
              private router:Router) {
    this.currentData = this.studentService.currentData;
  }

  ngOnInit() {
    this.extractData();
  }

  extractData() {
    let v = this.currentData;
    for (let k in v) {
      if (k === 'birthday' && v[k]) {
        let date = new Date(v[k]);
        v[k] = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        };
      }
    }
  }

  resetPwd() {
    this.modal1 = this.modalService.open(
        this.modal1_template, {
          backdrop: true,
          keyboard: true
        }
    );
  }

  gotoResetPwd() {
    this.studentService.resetPwd(this.currentData['user_id']).subscribe(
        (res:any)=> {
          if (res.success) {
            this.modal1.close();
            this.successMsg = '密码重置完成。';
            this.isShowSuccess = true;
            setTimeout((v)=> {
              this.isShowSuccess = false;
            }, 2000);
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

  edit() {
    let formValue = this.currentData;
    for (let k in formValue) {
      if (k === 'birthday') {
        let tmp = formValue[k].year + '-' + formValue[k].month + '-' + formValue[k].day;
        let date = new Date(tmp);
        formValue[k] = moment(date).format('YYYY-MM-DD');
      }
    }
    this.studentService.edit(formValue['user_id'], formValue).subscribe(
        (res:any)=> {
          if (res.success) {
            this.successMsg = '编辑学生信息成功。2s后返回学生列表。';
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