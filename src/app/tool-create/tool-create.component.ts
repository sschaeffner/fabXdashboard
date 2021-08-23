import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewTool} from "../shared/models/new-tool.model";
import {ToolService} from "../services/tool.service";
import {Router} from "@angular/router";
import {Tool} from "../shared/models/tool.model";
import {Device} from "../shared/models/device.model";
import {DeviceService} from "../services/device.service";
import {ToolType} from "../shared/models/ToolType.model";
import {ToolState} from "../shared/models/ToolState.model";
import {Qualification} from "../shared/models/qualification.model";
import {QualificationService} from "../services/qualification.service";
import {IdleState} from "../shared/models/IdleState.model";

@Component({
  selector: 'app-tool-create',
  templateUrl: './tool-create.component.html',
  styleUrls: ['./tool-create.component.scss']
})
export class ToolCreateComponent implements OnInit {

  error = "";

  devices: Device[] = [];
  qualifications: Qualification[] = [];
  toolTypes: string[] = [];
  idleStates: string[] = [];
  toolStates: string[] = [];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    deviceId: new FormControl('', Validators.required),
    pin: new FormControl('', Validators.required),
    toolType: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    idleState: new FormControl('IDLE_HIGH', Validators.required),
    toolState: new FormControl('GOOD', Validators.required),
    wikiLink: new FormControl(''),
    qualification: new FormControl('', Validators.required)
  });

  constructor(
    private toolService: ToolService,
    private deviceService: DeviceService,
    private qualificationService: QualificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDevices();
    this.getQualifications();
    this.toolTypes = Object.keys(ToolType);
    this.idleStates = Object.keys(IdleState);
    this.toolStates = Object.keys(ToolState);
  }

  onSubmit() {
    let newTool = new NewTool();
    newTool.name = this.form.get('name').value;
    newTool.deviceId = this.form.get('deviceId').value;
    newTool.pin = this.form.get('pin').value;
    newTool.toolType = this.form.get('toolType').value;
    newTool.time = this.form.get('time').value;
    newTool.idleState = this.form.get('idleState').value;
    newTool.toolState = this.form.get('toolState').value;
    newTool.wikiLink = this.form.get('wikiLink').value;
    newTool.qualifications = [this.form.get('qualification').value];

    this.toolService.createNewTool(newTool)
      .subscribe(
        (tool: Tool) => {
          console.log("newTool successfully created: %o", tool);
          //this.router.navigateByUrl(`/tool/${tool.id}`);
          this.router.navigateByUrl(`/tool`);
        },
        error => {
          this.error = error;
          console.error("newTool not successfully created: %o", error);
        }
      );
  }

  public getDevices() {
    this.deviceService.getAllDevices().subscribe(devices => {
      this.devices = devices;
    });
  }

  public getQualifications() {
    this.qualificationService.getAllQualifications().subscribe(qualifications => {
      this.qualifications = qualifications;
      this.qualifications.sort((q1, q2) => q1.orderNr - q2.orderNr);
    });
  }
}
