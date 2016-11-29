import { Component } from '@angular/core';

@Component({
  templateUrl: './full.component.html'
})

export class FullComponent {
  isCollapsed:boolean = false;
  switchSidebar:string = 'home';

  collapse(e:any) {
    this.isCollapsed = e;
  }

  switch(e:any) {
    this.switchSidebar = e;
  }
}