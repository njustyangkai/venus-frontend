import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './full.component';
import { ClassComponent } from '../class/class.component';

const routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
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