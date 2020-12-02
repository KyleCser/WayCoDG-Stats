import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { defer, from, concat, EMPTY, timer, Observable } from 'rxjs';
import { mergeMap, expand, reduce, take, mapTo, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdgaService {
  options = {
    headers: {
      session_name: undefined,
      'Content-Type': 'application/json'
    }
  };

  constructor(private http: HttpClient) { }

  setToken(token: string) {
    console.log('setToken');
    this.options.headers.session_name = token;
  }

  setCorsAnywhere(headers) {
    let cors_api_host = 'cors-anywhere.herokuapp.com';
    let cors_api_url = 'https://' + cors_api_host + '/';
    let slice = [].slice;
    let origin = window.location.protocol + '//' + window.location.host;
    let open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function() {
      let args = slice.call(arguments);
      let targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
      if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== cors_api_host) {
        args[1] = cors_api_url + args[1];
      }
      if (headers.session_name !== undefined && args[1].indexOf('session_name') === -1) {
        args[1] = cors_api_url + args[1] + '&session_name=' + headers.session_name;
      }

      open.apply(this, args);
      if (headers['Content-Type'] !== undefined) {
        this.setRequestHeader('Content-Type', headers['Content-Type']);
      }

      if (headers.session_name !== undefined) {
        this.setRequestHeader('session_name', headers.session_name);
      }
    };
  }

  getPlayers(state: string) {
    let offset = 0;
    let loops = 0;
    const allPlayers = [];

    console.log('getPlayers');
    this.setCorsAnywhere(this.options.headers);
    return this.http.get(`https://api.pdga.com/services/json/players?state_prov=${state}&offset=${offset}&limit=200`);
    // .pipe(
    //   expand((res: any) => {
    //     console.log('res', res);
    //     loops++;
    //     if (loops < 5 && (res.players || res.data.players.length < 200)) {
    //       offset += 200;
    //       return this.http.post(`https://api.pdga.com/services/json/players?state_prov=${state}&offset=${offset}&limit=200`, undefined, this.options);
    //     } else {
    //       return EMPTY;
    //     }
    //   }),
    //   reduce((acc, res: any) => acc.concat(res.data.players), allPlayers)
    // );
  }

  login() {
    this.setCorsAnywhere(this.options.headers);

    return this.http.post(`https://api.pdga.com/services/json/user/login`, JSON.stringify({
      username: environment.userName,
      password: environment.password
    }));
  }
}
