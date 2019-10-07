import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { User } from "../shared/models/user.model";
import {catchError, map, retry} from "rxjs/operators";
import { environment } from "../../environments/environment";
import { NewUser } from "../shared/models/new-user.model";

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
      retry(3),
      catchError(() => throwError('User not found')),
      map(data => new User().deserialize(data))
    );
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(`${this.baseUrl}/user`, httpOptions).pipe(
      retry(3),
      map(data => data.map(data => new User().deserialize(data)))
    );
  }

  public createNewUser(newUser: NewUser): Observable<User> {
    return this.httpService.post<User>(`${this.baseUrl}/user`, newUser, httpOptions).pipe(
      catchError(val => throwError(`Could not create user: ${val.message} (${val.error}).`))
    );
  }
}
