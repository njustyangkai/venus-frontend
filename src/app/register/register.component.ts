import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../util/http.service';
import { ApiConfig } from '../util/ApiConfig';

@Component({
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  width:number;
  height:number;

  isShowSuccess:boolean = false;
  successMsg:string;

  isUsernameUsed:boolean = false;

  @ViewChild('registerForm') registerForm:any;

  constructor(private router:Router, private http:HttpService) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  ngOnInit() {
    this.registerForm.valueChanges.subscribe((data:any)=> {
      this.isUsernameUsed = false;
    });
  }

  register(value:any) {
    this.http.post(ApiConfig.USER + '/isUsernameUsed', {username: value.username}).subscribe(
        (res:any)=> {
          res = res.json();
          if (res.success) {
            if (res.data) {
              this.isUsernameUsed = true;
            } else {
              this.http.post(ApiConfig.USER + '/register', value).subscribe(
                  (res:any)=> {
                    res = res.json();
                    if (res.success) {
                      this.successMsg = '注册完成，请联系老师激活。';
                      this.isShowSuccess = true;
                      setTimeout(()=> {
                        this.isShowSuccess = false;
                      }, 3000);
                    }
                  },
                  (error:any)=> {
                    console.log(error);
                  }
              )
            }
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }
}