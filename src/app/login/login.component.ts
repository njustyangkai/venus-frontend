import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../util/http.service';
import { ApiConfig } from '../util/ApiConfig';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
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

  ngOnInit() {
    this.loginForm.valueChanges.subscribe((data:any)=> {
      this.isShowAlarm = false;
    });
  }

  login() {
    this.http.post(ApiConfig.LOGIN, this.loginForm.form.value).subscribe(
        (res:any)=> {
          res = res.json();
          if (res.success) {
            window.localStorage.setItem('userId', res.data.user.id);
            window.localStorage.setItem('username', res.data.user.username);
            window.localStorage.setItem('role', res.data.role);
            this.router.navigate(['/main']);
          } else {
            this.alarmMsg = '用户名或密码错误！';
            this.isShowAlarm = true;
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }


}
