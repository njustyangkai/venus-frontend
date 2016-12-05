import { Component, OnInit } from '@angular/core';
import { ClassService } from './class.service';

@Component({
  selector: 'student-picker',
  templateUrl: './student-picker.component.html'
})

export class StudentPickerComponent implements OnInit {
  student:any;
  studentList:any[];

  constructor(private classService:ClassService) {
    this.student = {
      id: 'all',
      name: '全部'
    };
  }

  ngOnInit() {
    this.classService.getStudent().subscribe(
        (res:any)=> {
          console.log(res);
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }
}