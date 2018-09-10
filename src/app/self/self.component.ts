import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.css']
})
export class SelfComponent implements OnInit {

  me: { [key: string]: string } = {};

  constructor(private auth: AuthService) {
    if (!this.auth.needlogin()) {
      this.me = this.auth.me();
    } else {
      this.auth.login().subscribe(success => this.me = this.auth.me());
    }
  }

  ngOnInit() { }

  refresh() {
    this.auth.logout();
    window.location.reload();
  }
}
