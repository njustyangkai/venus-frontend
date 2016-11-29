import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

const module = [
  CommonModule,
  FormsModule,
  HttpModule,
  RouterModule
];

@NgModule({
  imports: module,
  exports: module
})

export class SharedModule {
}