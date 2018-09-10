import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  assignables: { [key: string]: string }[];

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if (!this.auth.needlogin()) {
      this.eval();
    } else {
      this.auth.login().subscribe(success => this.eval());
    }
  }

  eval() {
    this.auth.notifications()
      .subscribe(data => {

        this.assignables = data.map(d => {
          return {
            'description': `${d['subject']['title']}`,
            'link': `${d['url']}`
          };
        });
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      });
  }
}
