import { Component, OnInit } from '@angular/core';
import { ClassService } from './class.service';
import * as moment from 'moment';
import * as _ from 'underscore';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'student-class',
  templateUrl: './student-class.component.html'
})

export class StudentClassComponent implements OnInit {
  currentStudent:any;

  datas:any[];
  currentPage:number;
  size:number;
  pageSize:number;
  pageNum:number;
  currentPageData:any[];
  datasCopy:any[];

  constructor(private classService:ClassService, private studentService:StudentService) {
    moment.locale('zh-CN');
    this.currentStudent = this.studentService.currentData;
    this.datas = [];
    this.currentPage = 1;
    this.currentPageData = [];
    this.pageSize = 10;
    this.pageNum = 1;
    this.size = 0;
    this.datasCopy = [];
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.classService.getById(this.currentStudent['user_id']).subscribe(
        (res:any)=> {
          if (res.success) {
            this.datas = res.data;
            this.extractData();
            this.setSize();
            this.setCurrentPageData();
            this.datasCopy = this.datas;
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

  setSize() {
    this.size = this.datas.length;
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
    this.datas.forEach((v, i)=> {
      for (let k in v) {
        if (k === 'start_time') {
          v['startTime'] = moment(v[k]).format('YYYY-MM-DD HH:mm dddd');
          if (new Date(v[k]).getTime() > new Date().getTime()) {
            v['status'] = 0;
            v['statusShow'] = '未上';
          } else {
            v['status'] = 1;
            v['statusShow'] = '已上';
          }
        }
      }
      v['i'] = i;
      v['search'] = v['startTime'] + v['statusShow'];
    });
  }

  pageChange(event:any) {
    this.currentPage = parseInt(event);
    this.setCurrentPageData();
  }

  search(word:string) {
    if (word && word.trim() !== '') {
      this.datas = _.filter(this.datasCopy, (v:any)=> {
        return v['search'].indexOf(word) > -1;
      });
    } else {
      this.datas = this.datasCopy;
    }
    this.setSize();
    this.pageChange(1);
  }

  payTag(data:any, tag:number) {
    this.classService.payTag(data['event_id'], {pay: tag}).subscribe(
        (res:any)=> {
          console.log(res);
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }
}