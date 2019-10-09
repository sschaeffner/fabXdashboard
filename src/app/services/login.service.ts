import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  getOptions() {
    return {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("admin1:demopassword")
      })
    };
  }
}
