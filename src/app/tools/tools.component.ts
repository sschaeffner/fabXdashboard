import {Component, OnInit, ViewChild} from '@angular/core';
import {Tool} from "../shared/models/tool.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ToolService} from "../services/tool.service";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'deviceId', 'name', 'pin', 'toolType', 'qualifications'];

  tools: Tool[] = [];
  dataSource: MatTableDataSource<Tool> = new MatTableDataSource<Tool>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private toolService: ToolService) { }

  ngOnInit() {
    this.getTools();
  }

  public getTools() {
    this.toolService.getAllTools().subscribe(tools => {
      this.tools = tools;

      this.dataSource = new MatTableDataSource<Tool>(this.tools);
    })
  }
}
