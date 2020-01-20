import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";
import {Observable, throwError} from "rxjs";
import {Tool} from "../shared/models/tool.model";
import {catchError, map, retry} from "rxjs/operators";
import {NewTool} from "../shared/models/new-tool.model";
import {EditTool} from "../shared/models/edit-tool.model";

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private baseUrl = environment.baseUrl;

  constructor(
    private httpService: HttpClient,
    private loginService: LoginService
  ) { }

  public getTool(id: number): Observable<Tool> {
    return this.httpService.get<Tool>(`${this.baseUrl}/tool/${id}`, this.loginService.getOptions()).pipe(
      retry(3),
      catchError(val => throwError(`Tool not found: ${val.message} (${val.error}).`)),
      map(data => new Tool().deserialize(data))
    );
  }

  public getAllTools(): Observable<Tool[]> {
    return this.httpService.get<Tool[]>(`${this.baseUrl}/tool`, this.loginService.getOptions()).pipe(
      retry(3),
      map(data => data.map(data => new Tool().deserialize(data)))
    );
  }

  public createNewTool(newTool: NewTool): Observable<Tool> {
    return this.httpService.post<Tool>(`${this.baseUrl}/tool`, newTool, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not create tool: ${val.message} (${val.error}).`))
    );
  }

  public editTool(id: number, editTool: EditTool) {
    return this.httpService.patch(`${this.baseUrl}/tool/${id}`, editTool, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not edit tool: ${val.message} (${val.error}).`))
    );
  }

  public deleteTool(id: number) {
    return this.httpService.delete(`${this.baseUrl}/tool/${id}`, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not delete tool: ${val.message} (${val.error}).`))
    );
  }
}
