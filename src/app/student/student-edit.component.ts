import { Component, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './student-edit.component.html'
})

export class StudentEditComponent {
  isShowSuccess:boolean = false;
  successMsg:string;

  @ViewChild('modal1_template') modal1_template:any;
  modal1:any;

  constructor(private studentService:StudentService, private modalService:NgbModal) {
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
    this.studentService.resetPwd(this.studentService.currentData['user_id']).subscribe(
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
}