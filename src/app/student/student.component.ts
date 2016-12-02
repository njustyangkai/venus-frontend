import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import * as moment from 'moment';

@Component({
  templateUrl: './student.component.html'
})

export class StudentComponent implements OnInit {
  datas:any[];

  constructor(private studentService:StudentService) {
    this.datas = [];
  }

  ngOnInit() {
    this.studentService.getStudents().subscribe(
        (res:any)=> {
          if (res.success) {
            this.datas = res.data;
            this.extractData();
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

  extractData() {
    this.datas.forEach((v)=> {
      for (let k in v) {
        if (k === 'last_log_time') {
          v[k] = moment(v[k]).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    });
  }
}