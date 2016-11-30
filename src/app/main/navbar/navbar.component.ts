import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'px-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  username:string;

  @ViewChild('modal1_template') modal1_template:any;
  modal1:any;

  constructor(private router:Router, private modalService:NgbModal) {
    this.username = window.localStorage.getItem('username');
  }

  open1() {
    this.modal1 = this.modalService.open(this.modal1_template, {
      backdrop: true,
      keyboard: true
    });
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}