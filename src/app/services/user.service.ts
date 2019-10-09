import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { User } from "../shared/models/user.model";
import {catchError, map, retry} from "rxjs/operators";
import { environment } from "../../environments/environment";
import { NewUser } from "../shared/models/new-user.model";
import {EditUser} from "../shared/models/edit-user.model";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(
    private httpService: HttpClient,
    private loginService: LoginService
  ) { }

  public getUser(id: number): Observable<User> {
    return this.httpService.get<User[]>(`${this.baseUrl}/user/${id}`, this.loginService.getOptions()).pipe(
      retry(3),
      catchError(() => throwError('User not found')),
      map(data => new User().deserialize(data))
    );
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(`${this.baseUrl}/user`, this.loginService.getOptions()).pipe(
      retry(3),
      map(data => data.map(data => new User().deserialize(data)))
    );
  }

  public createNewUser(newUser: NewUser): Observable<User> {
    return this.httpService.post<User>(`${this.baseUrl}/user`, newUser, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not create user: ${val.message} (${val.error}).`))
    );
  }

  public editUser(id: number, editUser: EditUser) {
    return this.httpService.patch(`${this.baseUrl}/user/${id}`, editUser, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not edit user: ${val.message} (${val.error}).`))
    );
  }
}
