import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { HttpService } from '../util/http.service';
import { ApiConfig } from '../util/ApiConfig';
import { Router } from '@angular/router';

@Component({
  templateUrl: './first.component.html'
})

export class FirstComponent {
  username:string;
  isSexChecked:boolean = false;

  isShowSuccess:boolean = false;
  successMsg:string;

  @ViewChild('editForm') editForm:any;

  constructor(private http:HttpService, private router:Router) {
    this.username = window.localStorage.getItem('username');
  }

  sexCheck(e:any) {
    this.isSexChecked = true;
  }

  edit() {
    let formValue = this.editForm.form.value;
    for (let k in formValue) {
      if (k === 'birthday') {
        let tmp = formValue[k].year + '-' + formValue[k].month + '-' + formValue[k].day;
        let date = new Date(tmp);
        formValue[k] = moment(date).format('YYYY-MM-DD');
      }
    }
    this.http.post(ApiConfig.STUDENT + '/' + window.localStorage.getItem('userId'), formValue).subscribe(
        (res:any)=> {
          res = res.json();
          if (res.success) {
            window.localStorage.setItem('name', formValue['name']);
            this.successMsg = '提交成功。2s后登陆控制台。';
            this.isShowSuccess = true;
            setTimeout(()=> {
              this.isShowSuccess = false;
              this.router.navigate(['/main']);
            }, 2000);
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }
}