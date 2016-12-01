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

@NgModule({
  declarations: [
    LoginComponent,
    FullComponent,
    NavbarComponent,
    ClassComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    FullRoutingModule
  ],
  providers: [
    HttpService,
    FullService
  ]
})

export class FullModule {
}