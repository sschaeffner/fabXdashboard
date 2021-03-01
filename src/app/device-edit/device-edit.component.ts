import { Component, OnInit } from '@angular/core';
import {Device} from "../shared/models/device.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceService} from "../services/device.service";
import {EditDevice} from "../shared/models/edit-device.model";

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {

  error = "";

  device: Device;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    mac: new FormControl('', Validators.required),
    secret: new FormControl('', Validators.required),
    bgImageUrl: new FormControl('', Validators.required),
    backupBackendUrl: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.getDevice();
  }

  getDevice(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.deviceService.getDevice(id).subscribe(device => {
      this.device = device;

      this.form.patchValue({
        name: this.device.name,
        mac: this.device.mac,
        secret: this.device.secret,
        bgImageUrl: this.device.bgImageUrl,
        backupBackendUrl: this.device.backupBackendUrl
      });
    });
  }

  onSubmit() {
    let editDevice = new EditDevice();
    editDevice.name = this.form.get('name').value;
    editDevice.mac = this.form.get('mac').value;
    editDevice.secret = this.form.get('secret').value;
    editDevice.bgImageUrl = this.form.get('bgImageUrl').value;
    editDevice.backupBackendUrl = this.form.get('backupBackendUrl').value;

    this.deviceService.editDevice(this.device.id, editDevice)
      .subscribe(
        () => {
          console.log("device successfully edited");
          this.router.navigateByUrl(`/device/${this.device.id}`);
        },
        error => {
          this.error = error;
          console.error("device not successfully edited: %o", error);
        }
      )
  }
}
