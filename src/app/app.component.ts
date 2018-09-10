import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginName: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isLogin()
      .then(success => {
        if (success) {
          this.loginName = `${this.auth.me()['login']}`;
        } else {
          this.auth.login();
        }
      })
  }

  logout() {
    this.auth.logout();
    this.loginName = 'unknown';
  }

}
