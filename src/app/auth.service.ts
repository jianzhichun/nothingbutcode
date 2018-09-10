import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LocalStorage, LocalStorageService } from 'ngx-store';

import { github } from '../environments/environment';

import { Observable, of, Subject } from 'rxjs';
import { map, tap, mergeMap, filter, first, groupBy } from 'rxjs/operators';

const { client_id, client_secret, scope } = github,
  Query = {
    parse(search = window.location.search) {
      if (!search) return {}
      const queryString = search[0] === '?' ? search.substring(1) : search
      const query = {}
      queryString.split('&')
        .forEach(queryStr => {
          const [key, value] = queryStr.split('=')
          if (key) query[key] = value
        })

      return query
    },
    stringify(query, prefix = '?') {
      const queryString = Object.keys(query)
        .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
        .join('&')
      return queryString ? prefix + queryString : ''
    },
  };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @LocalStorage() accessToken: string;
  @LocalStorage() user: { [key: string]: any };

  private loginSuccess: Subject<boolean> = new Subject();

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    if (this.needlogin()) {
      let query = Query.parse(),
        code = query['code'];
      if (!code) {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`;
      }

      delete query['code'];
      let search = Query.stringify(query);
      history.replaceState(
        {}, '',
        `${window.location.origin}${window.location.pathname}${search}${window.location.hash}`
      );

      this.http.post(
        'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', null,
        {
          headers: { Accept: 'application/json' },
          params: { client_id, client_secret, code },
        }
      ).pipe(
        filter(data => 'access_token' in data),
        map(data => data['access_token']),
        tap(accessToken => this.accessToken = accessToken),
        mergeMap(accessToken =>
          this.http.get<{ [key: string]: any }>(`https://api.github.com/user?access_token=${accessToken}`)
        )
      ).pipe(
        filter(user => null != user),
        tap(user => this.user = user)
      ).subscribe(user => this.loginSuccess.next(true));
    } 
  }

  logout() {
    this.localStorage.remove('accessToken');
    this.localStorage.remove('user');
  }

  needlogin(): boolean {
    return !this.accessToken || !this.user;
  }

  login(): Observable<boolean> {
    return this.loginSuccess;
  }

  me(): { [key: string]: any } {
    return this.user;
  }

  notifications(): Observable<any> {
    return this.http.get(`https://api.github.com/notifications?access_token=${this.accessToken}`);
  }

}

