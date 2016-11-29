import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'px-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {

  @Output() collapse = new EventEmitter();
  isCollapsed:boolean = false;

  collapseSidebar(e:any) {
    this.isCollapsed = !this.isCollapsed;
    this.collapse.emit(this.isCollapsed);
  }

}