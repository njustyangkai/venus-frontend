import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../util/http.service';
import { ApiConfig } from '../util/ApiConfig';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {
  width:number;
  height:number;

  isShowAlarm:boolean = false;
  alarmMsg:string;

  username:string;
  password:string;

  @ViewChild('loginForm') loginForm:any;

  constructor(private router:Router, private http:HttpService) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  login() {
    this.http.post(ApiConfig.LOGIN, JSON.stringify(this.loginForm.form.value)).subscribe(
        (res:any)=> {
          res = res.json();
          if (res.success) {
            this.router.navigate(['/main']);
          } else {
            this.alarmMsg = '用户名或密码错误！';
            this.isShowAlarm = true;
            setTimeout(()=> {
              this.isShowAlarm = false;
            }, 3000);
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

}
