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
    this.studentList = [this.student];
    this.classService.currentStudent = this.student;
  }

  ngOnInit() {
    this.classService.getStudent().subscribe(
        (res:any)=> {
          if (res.success) {
            res.data.forEach((v:any) => {
              this.studentList.push({
                id: v['student_id'],
                name: v['name']
              });
            });
          }
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }

  setCurrentStudent() {
    this.classService.currentStudent = this.student;
  }
}