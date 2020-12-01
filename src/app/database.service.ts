import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  serverURL = environment.url + '/api';
  options = {
    headers: {

    }
  };

  constructor(private http: HttpClient) { }

  getCity(city: string) {
    return this.http.post(this.serverURL + `/city/${city}`, this.options);
  }
}
