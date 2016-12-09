import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NgbDatepickerI18n, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ClassService } from './class.service';
import { Router } from '@angular/router';
import { StudentService } from '../student/student.service';

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  zh: {
    weekdays: ['一', '二', '三', '四', '五', '六', '日'],
    months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  }
};

@Injectable()
export class I18n {
  language = 'en';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n:I18n) {
    super();
  }

  getWeekdayName(weekday:number):string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  getMonthName(month:number):string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
}

@Component({
  templateUrl: './class.component.html',
  viewProviders: [
    I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}
  ]
})

export class ClassComponent implements OnInit {
  clocks:string[];
  weekdays:any;

  lastDate:any;

  role:string;

  isShowAttention:boolean = false;
  attentionMsg:string;
  isShowSuccess:boolean = false;
  successMsg:string;

  currentDate:any;
  currentTime:any;
  currentWeekday:number;

  classData:any;
  tmpKey:string;
  tmpData:any;

  @ViewChild('modal1_template') modal1_template:any;
  modal1:any;
  @ViewChild('modal2_template') modal2_template:any;
  modal2:any;

  constructor(private _i18n:I18n,
              private classService:ClassService,
              private modalService:NgbModal,
              private router:Router,
              private studentService:StudentService) {
    moment.locale('zh-CN');
    this._i18n.language = 'zh';
    this.role = window.localStorage.getItem('role');
    this.clocks = [
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
    ];
    this.weekdays = ['一', '二', '三', '四', '五', '六', '日'];
    this.getNow();
    this.setLastDate();
  }

  ngOnInit() {
    this.initClassData();
  }

  getNow() {
    let date = new Date();
    this.currentDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
    this.currentTime = {
      hour: date.getHours(),
      minute: date.getMinutes()
    };
    this.getDate();
  }

  setLastDate() {
    this.lastDate = this.currentDate;
  }

  getToday() {
    this.getNow();
    this.isInitClassData();
    this.setLastDate();
  }

  isInitClassData() {
    let d = this.lastDate.year + '-' + this.lastDate.month + '-' + this.lastDate.day;
    let date = new Date(d);
    let minDate = new Date(moment(moment(date).weekday(0)).format('YYYY-MM-DD 00:00:00'));
    let maxDate = new Date(moment(moment(date).weekday(6)).format('YYYY-MM-DD 23:59:59'));
    let cd = this.currentDate.year + '-' + this.currentDate.month + '-' + this.currentDate.day;
    let cdate = new Date(cd + ' 00:00:00');
    if (cdate.getTime() < minDate.getTime() || cdate.getTime() > maxDate.getTime()) {
      this.initClassData();
    }
  }

  initClassData() {
    this.classData = {};
    this.weekdays.forEach((v:any, i:number)=> {
      this.clocks.forEach((_v:any) => {
        this.classData[(i + 1) + '-' + _v] = [];
      });
    });
    this.loadClassData();
  }

  loadClassData() {
    let d = this.currentDate.year + '-' + this.currentDate.month + '-' + this.currentDate.day;
    let date = new Date(d);
    let minDate = moment(moment(date).weekday(0)).format('YYYY-MM-DD 00:00:00');
    let maxDate = moment(moment(date).weekday(6)).format('YYYY-MM-DD 23:59:59');
    if (this.role === '0') {
      this.classService.getAll(minDate, maxDate).subscribe(
          (res:any)=> {
            if (res.success) {
              this.extractData(res.data);
            }
          },
          (error:any)=> {
            console.log(error);
          }
      );
    } else {
      this.classService.get(minDate, maxDate, window.localStorage.getItem('userId')).subscribe(
          (res:any)=> {
            if (res.success) {
              this.extractData(res.data);
            }
          },
          (error:any)=> {
            console.log(error);
          }
      );
    }
  }

  extractData(datas:any[]) {
    datas.forEach((v:any)=> {
      let date = new Date(v['start_time']);
      v['show'] = v['student_name'] + ' ' + moment(date).format('HH:mm');
      let weekday = moment(date).weekday() + 1;
      this.classData[weekday + '-' + moment(date).format('HH:00')].push(v);
    });
  }

  setDate(d:number) {
    let tmp = this.currentDate.year + '-' + this.currentDate.month + '-' + this.currentDate.day;
    let date = new Date(tmp);
    return moment(moment(date).weekday(d)).format('MM-DD');
  }

  getDate() {
    let d = this.currentDate.year + '-' + this.currentDate.month + '-' + this.currentDate.day;
    let date = new Date(d);
    this.currentWeekday = moment(date).weekday() + 1;
  }

  setDayClass(d:number) {
    if (d === this.currentWeekday) {
      return 'chosen';
    }
  }

  dateChange(e:any) {
    this.getDate();
    this.isInitClassData();
    this.setLastDate();
  }

  add() {
    let date = this.currentDate;
    let time = this.currentTime;
    let student = this.classService.currentStudent;
    if (!student.id) {
      this.attentionMsg = '请选择一名学生。';
      this.isShowAttention = true;
      setTimeout(()=> {
        this.isShowAttention = false;
      }, 2000);
      return;
    }
    if (time.hour < 8) {
      this.attentionMsg = '太早啦，学生还没起床呢。';
      this.isShowAttention = true;
      setTimeout(()=> {
        this.isShowAttention = false;
      }, 2000);
      return;
    }
    if (time.hour > 21) {
      this.attentionMsg = '太晚啦，学生要睡觉了。';
      this.isShowAttention = true;
      setTimeout(()=> {
        this.isShowAttention = false;
      }, 2000);
      return;
    }
    let tmp = date.year + '-' + date.month + '-' + date.day + ' ' + time.hour + ':' + time.minute;
    let dateTmp = new Date(tmp);
    let data = {
      'student_id': student.id,
      'student_name': student.name,
      'teacher_id': window.localStorage.getItem('userId'),
      'teacher_name': window.localStorage.getItem('username'),
      'color': this.getColor(),
      'start_time': moment(dateTmp).format('YYYY-MM-DD HH:mm:ss'),
      'end_time': moment(dateTmp).format('YYYY-MM-DD HH:mm:ss'),
      'show': student.name + ' ' + moment(dateTmp).format('HH:mm')
    };

    this.classService.add(data).subscribe(
        (res:any)=> {
          if (res.success) {
            data['event_id'] = res.data;
            this.classData[this.currentWeekday + '-' + moment(dateTmp).format('HH:00')].push(data);
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

  getColor() {
    const colors = [
      '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
      '#16a085', '#27ae60', '#2980b6', '#8e44ad', '#2c3e50',
      '#f1c404', '#e67e22', '#e74c3c', '#555555', '#95a5a6',
      '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'];

    return colors[Math.floor(Math.random() * 19) % 19];
  }

  del(k:string, data:any) {
    if (this.role === '1') return;
    this.tmpKey = k;
    this.tmpData = data;
    this.modal1 = this.modalService.open(
        this.modal1_template, {
          backdrop: true,
          keyboard: true
        }
    );
  }

  gotoDel() {
    this.classService.del(this.tmpData['event_id']).subscribe(
        (res:any)=> {
          if (res.success) {
            this.modal1.close();
            let index:number;
            this.classData[this.tmpKey].forEach((v:any, i:number)=> {
              if (v['event_id'] === this.tmpData['event_id']) {
                index = i;
              }
            });
            this.classData[this.tmpKey].splice(index, 1);
            this.successMsg = '删除课程完成。';
            this.isShowSuccess = true;
            setTimeout(()=> {
              this.isShowSuccess = false;
            }, 2000);
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

  gotoDetail() {
    if (this.role === '1') {
      this.classService.getStudentById(window.localStorage.getItem('userId')).subscribe(
          (res:any)=> {
            if (res.success && res.data) {
              res.data['user_id'] = window.localStorage.getItem('userId');
              res.data['username'] = window.localStorage.getItem('username');
              this.studentService.currentData = res.data;
              this.router.navigate(['/main/studentDetail']);
            }
          },
          (error:any)=> {
            console.log(error);
          }
      );
    }
  }

  copy() {
    this.modal2 = this.modalService.open(
        this.modal2_template, {
          backdrop: true,
          keyboard: true
        }
    );
  }

  gotoCopy() {
    let tmp = this.currentDate.year + '-' + this.currentDate.month + '-' + this.currentDate.day;
    let date = new Date(tmp);
    let oriStart = moment(moment(date).weekday(-7)).format('YYYY-MM-DD 00:00:00');
    let oriEnd = moment(moment(date).weekday(-1)).format('YYYY-MM-DD 23:59:59');
    let start = moment(moment(date).weekday(0)).format('YYYY-MM-DD 00:00:00');
    let end = moment(moment(date).weekday(6)).format('YYYY-MM-DD 23:59:59');
    let postData = {
      oriStart: oriStart,
      oriEnd: oriEnd,
      start: start,
      end: end
    };
    this.classService.copy(postData).subscribe(
        (res:any)=> {
          if (res.success) {
            this.modal2.close();
            this.successMsg = '复制上周完成。2s后刷新本周课程。';
            this.isShowSuccess = true;
            setTimeout(()=>{
              this.isShowSuccess = false;
              this.initClassData();
            },2000);
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }
}
