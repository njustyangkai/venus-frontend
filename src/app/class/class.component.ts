import { Component, Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

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

export class ClassComponent {
  clocks:string[];

  currentDate:any;
  currentWeekday:number;

  constructor(private _i18n:I18n) {
    moment.locale('zh-CN');
    this._i18n.language = 'zh';
    this.clocks = [
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
      '22:00'
    ];
    this.getNow();
  }

  getNow() {
    let date = new Date();
    this.currentDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
    this.getDate();
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
    this.currentDate = e;
    this.getDate();
  }
  
}
