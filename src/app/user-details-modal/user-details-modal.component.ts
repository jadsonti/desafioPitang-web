import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.css']
})
export class UserDetailsModalComponent implements OnInit {
  @Input() user: any;

  isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  show(user: any) {
    this.user = user;
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

}
