import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './full.component';
import { ClassComponent } from '../class/class.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { StudentComponent } from '../student/student.component';

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