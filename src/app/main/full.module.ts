import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './full.component';
import { FullRoutingModule } from './full-routing.module';
import { HttpService } from '../util/http.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClassComponent } from '../class/class.component';
import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    FullComponent,
    NavbarComponent,
    SidebarComponent,
    ClassComponent
  ],
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    FullRoutingModule
  ],
  providers: [
    HttpService
  ]
})

export class FullModule {
}