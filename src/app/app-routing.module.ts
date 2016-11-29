import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes:any = [];
const routing:any = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    routing
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}