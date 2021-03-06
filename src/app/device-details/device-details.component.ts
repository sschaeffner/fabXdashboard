import { Component, OnInit } from '@angular/core';
import {Device} from "../shared/models/device.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceService} from "../services/device.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {

  device: Device;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.getDevice();
  }

  getDevice() {
    const deviceId = +this.route.snapshot.paramMap.get('id');
    this.deviceService.getDevice(deviceId).subscribe(device => this.device = device);
  }

  deleteDevice() {
    let confirmDelete = confirm(`Delete device ${this.device.name}?`);
    if (confirmDelete) {
      this.deviceService.deleteDevice(this.device.id).subscribe(
        () => {
          this.router.navigateByUrl('/device');
        },
        error => {
          alert(`Could not delete device! Are all tools removed? \n${error}`);
        });
    }
  }
}
