import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './full.component';
import { ClassComponent } from '../class/class.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { StudentComponent } from '../student/student.component';
import { StudentAddComponent } from '../student/student-add.component';
import { StudentEditComponent } from '../student/student-edit.component';
import { StudentDetailComponent } from '../student/student-detail.component';
import { FirstComponent } from '../first/first.component';

const routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'first',
    component: FirstComponent
  },
  {
    path: 'main',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'class'
      },
      {
        path: 'class',
        component: ClassComponent
      },
      {
        path: 'student',
        component: StudentComponent
      },
      {
        path: 'addStudent',
        component: StudentAddComponent
      },
      {
        path: 'editStudent',
        component: StudentEditComponent
      },
      {
        path: 'studentDetail',
        component: StudentDetailComponent
      }
    ]
  }
];

const routing:any = RouterModule.forChild(<Routes>routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})

export class FullRoutingModule {

}