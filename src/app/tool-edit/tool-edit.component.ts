import {Component, OnInit} from '@angular/core';
import {Tool} from "../shared/models/tool.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToolService} from "../services/tool.service";
import {EditTool} from "../shared/models/edit-tool.model";
import {Device} from "../shared/models/device.model";
import {DeviceService} from "../services/device.service";
import {ToolType} from "../shared/models/ToolType.model";
import {ToolState} from "../shared/models/ToolState.model";
import {Qualification} from "../shared/models/qualification.model";
import {QualificationService} from "../services/qualification.service";
import {forkJoin, Observable} from "rxjs";
import {IdleState} from "../shared/models/IdleState.model";

@Component({
  selector: 'app-tool-edit',
  templateUrl: './tool-edit.component.html',
  styleUrls: ['./tool-edit.component.scss']
})
export class ToolEditComponent implements OnInit {

  error = "";

  tool: Tool;
  devices: Device[] = [];
  qualifications: Qualification[] = [];
  toolTypes: string[] = [];
  idleStates: string[] = [];
  toolStates: string[] = [];

  form = new FormGroup({
    deviceId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    pin: new FormControl('', Validators.required),
    toolType: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    idleState: new FormControl('', Validators.required),
    toolState: new FormControl('', Validators.required),
    wikiLink: new FormControl(''),
    qualifications: new FormGroup({})
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toolService: ToolService,
    private deviceService: DeviceService,
    private qualificationService: QualificationService
  ) { }

  ngOnInit() {
    let toolObs = this.getTool();
    this.getDevices();
    let qualificationsObs = this.getQualifications();
    this.toolTypes = Object.keys(ToolType);
    this.idleStates = Object.keys(IdleState);
    this.toolStates = Object.keys(ToolState);

    forkJoin([toolObs, qualificationsObs]).subscribe(o => {
      let qualificationsFormGroup = this.form.get('qualifications') as FormGroup;
      let tool: Tool = o[0];
      let toolQualificationIds: number[] = tool.qualifications.map(q => q.id);
      let qualifications: Qualification[] = o[1];

      this.qualifications = qualifications;
      this.qualifications.sort((q1, q2) => q1.orderNr - q2.orderNr);

      this.qualifications.forEach(q => {
        qualificationsFormGroup.addControl(String(q.id), new FormControl(false));
      });

      console.log("toolQualificationIds: %o, qualifications: %o", toolQualificationIds, qualifications);

      qualifications.forEach(q => {
        qualificationsFormGroup.get(String(q.id)).setValue(toolQualificationIds.includes(q.id));
      });
    })
  }

  getTool(): Observable<Tool> {
    const id = +this.route.snapshot.paramMap.get('id');
    let toolObs = this.toolService.getTool(id);

    toolObs.subscribe(tool => {
      this.tool = tool;

      this.form.patchValue({
        deviceId: this.tool.deviceId,
        name: this.tool.name,
        pin: this.tool.pin,
        toolType: this.tool.toolType,
        time: this.tool.time,
        idleState: this.tool.idleState,
        toolState: this.tool.toolState,
        wikiLink: this.tool.wikiLink
      });
    });

    return toolObs;
  }

  onSubmit() {
    let editTool = new EditTool();
    editTool.deviceId = this.form.get('deviceId').value;
    editTool.name = this.form.get('name').value;
    editTool.pin = this.form.get('pin').value;
    editTool.toolType = this.form.get('toolType').value;
    editTool.time = this.form.get('time').value;
    editTool.idleState = this.form.get('idleState').value;
    editTool.toolState = this.form.get('toolState').value;
    editTool.wikiLink = this.form.get('wikiLink').value;
    editTool.qualifications = [];

    let qualificationsFormGroup = this.form.get('qualifications') as FormGroup;
    this.qualifications.forEach(q => {
      if (qualificationsFormGroup.get(String(q.id)).value) {
        editTool.qualifications.push(q.id);
      }
    });

    this.toolService.editTool(this.tool.id, editTool)
      .subscribe(
        () => {
          console.log("tool successfully edited");
          this.router.navigateByUrl(`/tool/${this.tool.id}`);
        },
        error => {
          this.error = error;
          console.error("tool not successfully edited: %o", error);
        });
  }

  public getDevices() {
    this.deviceService.getAllDevices().subscribe(devices => {
      this.devices = devices;
    });
  }

  public getQualifications(): Observable<Qualification[]> {
    return this.qualificationService.getAllQualifications();
  }
}
