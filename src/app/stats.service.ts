import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  api_url = 'http://api.pdga.com/services/json';
  session_name = 'tWKeEAf0mQypHZMlQcfdlnkvjwyj9pAQQNolYZ3QXdQ';

  constructor(private http: HttpClient) { }

  login() {
    const criteria = {
      username: 'ktcser',
      password: ''
    };
    return Observable.create(observer => {
      return this.http.post('http://localhost:6969/api/pdga/login', criteria)
        .subscribe((result: any) => {
          this.session_name = result.session_name;
          console.log(this.session_name, result);
          observer.next(true);
        });
    });
  }

  players(criteria: any) {
    criteria.session_name = this.session_name;
    console.log(criteria);
    return this.http.post('http://localhost:6969/api/pdga/players', criteria);
  }
}
