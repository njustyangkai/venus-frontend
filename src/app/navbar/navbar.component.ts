import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../util/http.service';
import { ApiConfig } from '../util/ApiConfig';

@Component({
  selector: 'px-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  username:string;

  isPwdRightFlag:boolean = true;

  isShowSuccess:boolean = false;
  successMsg:string;

  @ViewChild('modal1_template') modal1_template:any;
  modal1:any;

  @ViewChild('modal2_template') modal2_template:any;
  modal2:any;

  constructor(private router:Router,
              private modalService:NgbModal,
              private http:HttpService) {
    this.username = window.localStorage.getItem('username');
  }

  open1() {
    this.modal1 = this.modalService.open(this.modal1_template, {
      backdrop: true,
      keyboard: true
    });
  }

  open2() {
    this.modal2 = this.modalService.open(this.modal2_template, {
      backdrop: true,
      keyboard: true
    });
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  modifyPwd(value:any) {
    this.isPwdRight(value.password).subscribe(
        (res:any)=> {
          res = res.json();
          if (res.success) {
            this.http.put(ApiConfig.USER + '/modifyPwd/' + window.localStorage.getItem('userId'), value).subscribe(
                (res:any)=> {
                  res = res.json();
                  if (res.success) {
                    this.modal2.close();
                    this.successMsg = '修改密码成功。';
                    this.isShowSuccess = true;
                    setTimeout(()=> {
                      this.isShowSuccess = false;
                    }, 3000);
                  }
                },
                (error:any)=> {
                  console.log(error);
                }
            );
          } else {
            this.isPwdRightFlag = false;
          }
        }
    );
  }

  isPwdRight(value:any) {
    return this.http.post(ApiConfig.USER + '/isPwdRight', {
      userId: window.localStorage.getItem('userId'),
      password: value
    });
  }

  pwdChange(value:any) {
    this.isPwdRightFlag = true;
  }

  gotoStudent() {
    this.router.navigate(['/main/student']);
  }

  gotoClass() {
    this.router.navigate(['/main/class']);
  }
}