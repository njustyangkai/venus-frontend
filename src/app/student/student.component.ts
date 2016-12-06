import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from './student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as _ from 'underscore';

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
  isCheckAll:boolean;
  selections:any[];
  datasCopy:any[];

  isBatchDel:boolean = false;
  singleOpData:any;

  isShowSuccess:boolean = false;
  successMsg:string;
  isShowAlarm:boolean = false;
  alarmMsg:string;

  @ViewChild('modal1_template') modal1_template:any;
  modal1:any;

  @ViewChild('modal2_template') modal2_template:any;
  modal2:any;

  status:number;

  constructor(private studentService:StudentService,
              private router:Router,
              private modalService:NgbModal) {
    moment.locale('zh-CN');
    this.datas = [];
    this.currentPage = 1;
    this.currentPageData = [];
    this.pageSize = 10;
    this.pageNum = 1;
    this.size = 0;
    this.isCheckAll = false;
    this.selections = [];
    this.datasCopy = [];
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.studentService.get().subscribe(
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
        if (k === 'last_log_time') {
          v['lastLogTime'] = moment(v[k]).format('YYYY-MM-DD HH:mm:ss');
        }
      }
      v['i'] = i;
      v['search'] = v['username'] + v['name'];
    });
  }

  pageChange(event:any) {
    this.isCheckAll = false;
    this.currentPage = parseInt(event);
    this.selections = [];
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

  checkAll(isCheck:boolean) {
    this.isCheckAll = isCheck;
    this.selections = [];
    if (isCheck) {
      for (let i = 0; i < this.currentPageData.length; i++) {
        this.selections.push(this.currentPageData[i]);
      }
    }
  }

  check(i:number, isCheck:boolean) {
    if (isCheck) {
      this.selections.push(this.currentPageData[i]);
    } else {
      let index:number;
      for (let j = 0; j < this.selections.length; j++) {
        if (this.currentPageData[i] === this.selections[j]) {
          index = j;
        }
      }
      this.selections.splice(index, 1);
    }
  }

  add() {
    this.router.navigate(['/main/addStudent']);
  }

  del(data:any) {
    this.singleOpData = data;
    this.isBatchDel = false;
    this.modal1 = this.modalService.open(
        this.modal1_template, {
          backdrop: true,
          keyboard: true
        }
    );
  }

  batchDel() {
    this.isBatchDel = true;
    this.modal1 = this.modalService.open(
        this.modal1_template, {
          backdrop: true,
          keyboard: true
        }
    );
  }

  gotoDel() {
    let del = (v:any)=> {
      this.studentService.del(v['user_id']).subscribe(
          (res:any)=> {
            if (res.success) {
              this.modal1.close();
              this.successMsg = '删除成功。2秒后刷新数据。';
              this.isShowSuccess = true;
              setTimeout((v)=> {
                this.isShowSuccess = false;
                this.initData();
              }, 2000);
            } else {
              this.modal1.close();
              this.alarmMsg = res.message;
              this.isShowAlarm = true;
            }
          },
          (error:any)=> {
            console.log(error);
          }
      );
    };
    if (!this.isBatchDel) {
      del(this.singleOpData);
    } else {
      this.selections.forEach((v:any)=> {
        del(v);
      });
    }
  }

  lock() {
    this.status = 0;
    this.modal2 = this.modalService.open(
        this.modal2_template, {
          backdrop: true,
          keyboard: true
        }
    );
  }

  unlock() {
    this.status = 1;
    this.modal2 = this.modalService.open(
        this.modal2_template, {
          backdrop: true,
          keyboard: true
        }
    );
  }

  gotoChangeStatus() {
    this.selections.forEach((v:any)=> {
      this.studentService.changeStatus(v['user_id'], {status: this.status}).subscribe(
          (res:any)=> {
            if (res.success) {
              this.modal2.close();
              this.successMsg = '操作成功。2秒后刷新数据。';
              this.isShowSuccess = true;
              setTimeout((v)=> {
                this.isShowSuccess = false;
                this.initData();
              }, 2000);
            }
          },
          (error:any)=> {
            console.log(error);
          }
      );
    });
  }

  edit(data:any) {
    this.studentService.currentData = data;
    this.router.navigate(['/main/editStudent']);
  }

  gotoDetail(data:any) {
    this.studentService.currentData = data;
    this.router.navigate(['/main/studentDetail']);
  }
}