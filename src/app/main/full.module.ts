import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './full.component';
import { FullRoutingModule } from './full-routing.module';
import { HttpService } from '../util/http.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ClassComponent } from '../class/class.component';
import { LoginComponent } from '../login/login.component';
import { FullService } from './full.service';
import { RegisterComponent } from '../register/register.component';
import { StudentComponent } from '../student/student.component';
import { StudentService } from '../student/student.service';
import { StudentAddComponent } from '../student/student-add.component';
import { StudentEditComponent } from '../student/student-edit.component';
import { StudentDetailComponent } from '../student/student-detail.component';
import { FirstComponent } from '../first/first.component';
import { StudentPickerComponent } from '../class/student-picker.component';
import { ClassService } from '../class/class.service';

@NgModule({
  declarations: [
    LoginComponent,
    FullComponent,
    NavbarComponent,
    ClassComponent,
    RegisterComponent,
    FirstComponent,
    StudentComponent,
    StudentAddComponent,
    StudentEditComponent,
    StudentDetailComponent,
    StudentPickerComponent
  ],
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    FullRoutingModule
  ],
  providers: [
    HttpService,
    FullService,
    StudentService,
    ClassService
  ]
})

export class FullModule {
}