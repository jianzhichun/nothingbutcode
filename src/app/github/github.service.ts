import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorage } from 'ngx-store';
import { User, UserService } from "../auth/auth.domain";
import { BehaviorSubject } from 'rxjs';
import { map, tap, mergeMap, filter } from 'rxjs/operators';
import { github } from '../../environments/environment';

const { client_id, client_secret, scope } = github,
  openWindow = function (url, name, iWidth, iHeight): Window {
    var iTop = (window.screen.height - 30 - iHeight) / 2;
    var iLeft = (window.screen.width - 10 - iWidth) / 2;
    return window.open(url, name, `height=${iHeight},,innerHeight=${iHeight},width=${iWidth},innerWidth=${iWidth},top=${iTop},left=${iLeft},toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no`);
  };

@Injectable({
  providedIn: 'root'
})
export class GithubService extends UserService {

  public static anonymousUser = <User>{
    avatar_url: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
    name: '',
    permissions: <string[]>['anonymous']
  };

  private oauthWinow: Window;
  @LocalStorage() githubUser: any = GithubService.anonymousUser;

  constructor(private http: HttpClient) {
    super(new BehaviorSubject<User>(null));
    this.currentUserSubject.next(this.githubUser);

    window.addEventListener("message", event => {
      let data = event.data;
      if (data && data.type && data.type === 'github-oauth') {
        let code = data.code;
        this.http.post(
          'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', null,
          {
            headers: { Accept: 'application/json' },
            params: { client_id, client_secret, code },
          }
        ).pipe(
          filter(data => 'access_token' in data),
          map(data => data['access_token']),
          tap(accessToken => Object.assign(this.githubUser, { accessToken: accessToken })),
          mergeMap(accessToken =>
            this.http.get<{ [key: string]: any }>(`https://api.github.com/user?access_token=${accessToken}`)
          )
        ).pipe(
          tap<User>(user => user['permissions'] = <string[]>['user']),
          tap<User>(user => { Object.assign(this.githubUser, user); this.githubUser.save() }),
        ).subscribe(user => this.currentUserSubject.next(user));
        if (this.oauthWinow) this.oauthWinow.close();
      }
    });
  }


  login() {
    this.currentUserSubject.next(<User>{
      avatar_url: "./assets/images/loading.gif",
      name: "...",
      permissions: []
    });
    this.oauthWinow = openWindow(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`,
      'oauth',
      400, 500
    );
  }

  logout() {
    this.githubUser = GithubService.anonymousUser;
    this.githubUser.save();
    this.currentUserSubject.next(GithubService.anonymousUser);
  }

}

