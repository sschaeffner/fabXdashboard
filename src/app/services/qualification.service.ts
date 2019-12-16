import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {Qualification} from "../shared/models/qualification.model";
import {catchError, map, retry} from "rxjs/operators";
import {NewQualification} from "../shared/models/new-qualification.model";
import {EditQualification} from "../shared/models/edit-qualification.model";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  private baseUrl = environment.baseUrl;

  constructor(
    private httpService: HttpClient,
    private loginService: LoginService
  ) { }

  public getQualification(id: number): Observable<Qualification> {
    return this.httpService.get<Qualification>(`${this.baseUrl}/qualification/${id}`, this.loginService.getOptions()).pipe(
      retry(3),
      catchError(val => throwError(`Qualification not found: ${val.message} (${val.error}).`)),
      map(data => new Qualification().deserialize(data))
    );
  }

  public getAllQualifications(): Observable<Qualification[]> {
    return this.httpService.get<Qualification[]>(`${this.baseUrl}/qualification`, this.loginService.getOptions()).pipe(
      retry(3),
      map(data => {
        let qualifications = data.map(data => new Qualification().deserialize(data));
        qualifications.sort((q1, q2) => q1.orderNr - q2.orderNr);
        return qualifications;
      })
    );
  }

  public createNewQualification(newQualification: NewQualification): Observable<Qualification> {
    return this.httpService.post<Qualification>(`${this.baseUrl}/qualification`, newQualification, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not create qualification: ${val.message} (${val.error}).`))
    );
  }

  public editQualification(id: number, editQualification: EditQualification) {
    return this.httpService.patch(`${this.baseUrl}/qualification/${id}`, editQualification, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not edit qualification: ${val.message} (${val.error}).`))
    );
  }
}
