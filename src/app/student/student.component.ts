import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import * as moment from 'moment';

@Component({
  templateUrl: './student.component.html'
})

export class StudentComponent implements OnInit {
  datas:any[];
  currentPage:number;
  size:number;
  pageSize:number;
  pageNum:number;
  currentPageData:any[];
  hasData:boolean;
  isCheckAll:boolean;
  selections:any[];

  constructor(private studentService:StudentService) {
    this.datas = [];
    this.currentPage = 1;
    this.currentPageData = [];
    this.pageSize = 5;
    this.pageNum = 1;
    this.hasData = false;
    this.isCheckAll = false;
    this.selections = [];
  }

  ngOnInit() {
    this.studentService.getStudents().subscribe(
        (res:any)=> {
          if (res.success) {
            this.datas = res.data;
            this.extractData();
            this.setSize();
            this.setCurrentPageData();
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

  setSize() {
    this.size = this.datas.length;
    if (this.size > 0) {
      this.hasData = true;
    } else {
      this.hasData = false;
    }
    this.pageNum = Math.ceil(this.size / this.pageSize);
  }

  setCurrentPageData() {
    this.currentPageData = [];
    let index = (this.currentPage - 1) * this.pageSize;
    let length = 0;
    if (this.size < this.currentPage * this.pageSize) {
      length = this.size;
    } else {
      length = this.currentPage * this.pageSize;
    }
    for (let i = index; i < length; i++) {
      this.currentPageData.push(this.datas[i]);
    }
  }

  extractData() {
    this.datas.forEach((v)=> {
      for (let k in v) {
        if (k === 'last_log_time') {
          v['lastLogTime'] = moment(v[k]).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    });
  }

  pageChange(event:any) {
    this.isCheckAll = false;
    this.currentPage = parseInt(event);
    this.selections = [];
    this.setCurrentPageData();
  }
}