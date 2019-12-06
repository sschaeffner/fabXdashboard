import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Device} from "../shared/models/device.model";
import {DeviceService} from "../services/device.service";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'mac'];

  devices: Device[] = [];
  dataSource: MatTableDataSource<Device> = new MatTableDataSource<Device>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.getDevices();
  }

  public getDevices() {
    this.deviceService.getAllDevices().subscribe(devices => {
      this.devices = devices;

      this.dataSource = new MatTableDataSource<Device>(this.devices);
      this.dataSource.sort = this.sort;
    })
  }
}
