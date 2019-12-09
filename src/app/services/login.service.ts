import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Info} from "../shared/models/info.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.baseUrl;

  constructor(
    private httpService: HttpClient
  ) { }

  doLogin(username: string, password: string): Observable<string> {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    return this.checkLogin();
  }

  checkLogin(): Observable<string> {
    return this.httpService.get<Info>(`${this.baseUrl}/info`, this.getOptions()).pipe(
      catchError((err, _) => {
        console.log("checkLogin error: %o", err);
        return throwError(err);
      }),
      map(info => info.adminName)
    );
  }

  doLogout(): void {
    localStorage.clear();
  }

  getOptions() {
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");

    return {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa(`${username}:${password}`)
      })
    };
  }
}
