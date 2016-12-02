import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';

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
          console.log(res);
        },
        (error:any)=> {
          console.log(error);
        }
    );
  }
}