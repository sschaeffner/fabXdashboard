import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "../shared/models/user.model";
import {catchError, map, retry} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {NewUser} from "../shared/models/new-user.model";
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
    return this.httpService.get<User>(`${this.baseUrl}/user/${id}`, this.loginService.getOptions()).pipe(
      retry(3),
      catchError(val => throwError(`User not found: ${val.message} (${val.error})`)),
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

  public removeCard(id: number) {
    let editUserRemoveCard = new EditUser();
    editUserRemoveCard.cardId = "";
    editUserRemoveCard.cardSecret = "";
    return this.editUser(id, editUserRemoveCard);
  }

  public addQualification(userId: number, qualificationId: number) {
    return this.httpService.post(`${this.baseUrl}/user/${userId}/qualifications`,
      { 'userId' : userId, 'qualificationId' : qualificationId},
      this.loginService.getOptions()).pipe(
        catchError(val => throwError(`Could not add qualification: ${val.message} (${val.error}).`))
    );
  }

  public removeQualification(userId: number, qualificationId: number) {
    return this.httpService.delete(`${this.baseUrl}/user/${userId}/qualifications/${qualificationId}`, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not remove qualification: ${val.message} (${val.error}).`))
    );
  }

  public deleteUser(userId: number) {
    return this.httpService.delete(`${this.baseUrl}/user/${userId}`, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not delete user: ${val.message} (${val.error}).`))
    )
  }
}
