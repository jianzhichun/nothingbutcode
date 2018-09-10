import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LocalStorage, LocalStorageService } from 'ngx-store';


const client_id = "45d2ac73462e936bb331",
  client_secret = "e1c356563c045a7273f047ec3c8312857b161dc2",
  scope = "user,public_repo",
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

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  login() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`;
  }

  logout() {
    this.localStorage.remove('accessToken');
    this.localStorage.remove('user');
  }

  async isLogin(): Promise<boolean> {
    if (!this.accessToken || !this.user) {
      let query = Query.parse(),
        code = query['code'];
      if (!code) return false;

      delete query['code'];
      let search = Query.stringify(query);
      history.replaceState({}, '', `${window.location.origin}${window.location.pathname}${search}${window.location.hash}`);

      let data = await this.http.post(
        'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', null,
        {
          headers: { Accept: 'application/json' },
          params: { client_id, client_secret, code },
        }
      ).toPromise().then(data => data);

      this.accessToken = data['access_token'];
      this.user = await this.http
          .get<{ [key: string]: any }>(`https://api.github.com/user?access_token=${this.accessToken}`)
          .toPromise().then(user => user);
    }
    return true;
  }

  me(): { [key: string]: any } {
    return this.user;
  }

}

