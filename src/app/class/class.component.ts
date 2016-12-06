import { Component, Injectable, OnInit } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ClassService } from './class.service';

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

  currentDate:any;
  currentTime:any;
  currentWeekday:number;

  classData:any;

  constructor(private _i18n:I18n, private classService:ClassService) {
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
    let minDate = new Date(moment(date).weekday(0).format('YYYY-MM-DD 00:00:00'));
    let maxDate = new Date(moment(date).weekday(6).format('YYYY-MM-DD 23:59:59'));
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
  }

  setDate(d:number) {
    let tmp = this.currentDate.year + '-' + this.currentDate.month + '-' + this.currentDate.day;
    let date = new Date(tmp);
    return moment(moment(date).weekday(d - 1)).format('MM-DD');
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
      studentId: student.id,
      studentName: student.name,
      teacherId: window.localStorage.getItem('userId'),
      teacherName: window.localStorage.getItem('username'),
      color: this.getColor(),
      startTime: moment(dateTmp).format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(dateTmp).format('YYYY-MM-DD HH:mm:ss'),
      show: student.name + ' ' + moment(dateTmp).format('HH:mm')
    };

    this.classService.add(data).subscribe(
        (res:any)=> {
          if (res.success) {
            data['eventId'] = res.data;
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
      '#00aff0', '#a20025', '#647687', '#00aba9', '#d80073', '#6d8764',
      '#008a00', '#dc4fad', '#825a2c', '#60a917', '#aa00ff', '#e3c800',
      '#a4c400', '#6a00ff', '#f0a30a', '#555555', '#222222', '#63362f',
      '#128023', '#bf5a15', '#9a1616', '#9a165a', '#57169a', '#16499a'];

    return colors[Math.floor(Math.random() * 23) % 23];
  }

}
