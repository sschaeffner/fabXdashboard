import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { User } from "../shared/models/user.model";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Authorization": "Basic " + btoa("admin1:demopassword")
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private httpService: HttpClient) { }

  public getUser(id: number): Observable<User> {
    return this.httpService.get<User[]>(`${this.baseUrl}/user/${id}`, httpOptions).pipe(
      map(data => new User().deserialize(data)),
      catchError(() => throwError('User not found'))
    )
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(`${this.baseUrl}/user`, httpOptions).pipe(
      map(data => data.map(data => new User().deserialize(data)))
    );
  }
}
