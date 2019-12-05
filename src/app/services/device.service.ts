import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { LoginService } from "./login.service";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Device } from "../shared/models/device.model";
import { catchError, map, retry } from "rxjs/operators";
import { NewDevice } from "../shared/models/new-device.model";
import { EditDevice } from "../shared/models/edit-device.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private baseUrl = environment.baseUrl;

  constructor(
    private httpService: HttpClient,
    private loginService: LoginService
  ) { }

  public getDevice(id: number): Observable<Device> {
    return this.httpService.get<Device>(`${this.baseUrl}/device/${id}`, this.loginService.getOptions()).pipe(
      retry(3),
      catchError(val => throwError(`Device not found: ${val.message} (${val.error})`)),
      map(data => new Device().deserialize(data))
    );
  }

  public getAllDevices(): Observable<Device[]> {
    return this.httpService.get<Device[]>(`${this.baseUrl}/device`, this.loginService.getOptions()).pipe(
      retry(3),
      map(data => data.map(data => new Device().deserialize(data)))
    );
  }

  public createNewDevice(newDevice: NewDevice): Observable<Device> {
    return this.httpService.post<Device>(`${this.baseUrl}/device`, newDevice, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not create device: ${val.message} (${val.error}).`))
    );
  }

  public editDevice(id: number, editDevice: EditDevice) {
    return this.httpService.patch(`${this.baseUrl}/device/${id}`, editDevice, this.loginService.getOptions()).pipe(
      catchError(val => throwError(`Could not edit device: ${val.message} (${val.error}).`))
    );
  }
}
