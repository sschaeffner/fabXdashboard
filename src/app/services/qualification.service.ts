import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Qualification} from "../shared/models/qualification.model";
import {map, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  private baseUrl = environment.baseUrl;

  constructor(
    private httpService: HttpClient,
    private loginService: LoginService
  ) { }

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
}
