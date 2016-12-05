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

@NgModule({
  declarations: [
    LoginComponent,
    FullComponent,
    NavbarComponent,
    ClassComponent,
    RegisterComponent,
    StudentComponent,
    StudentAddComponent,
    StudentEditComponent
  ],
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    FullRoutingModule
  ],
  providers: [
    HttpService,
    FullService,
    StudentService
  ]
})

export class FullModule {
}