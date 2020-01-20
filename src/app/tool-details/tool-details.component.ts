import { Component, OnInit } from '@angular/core';
import {Tool} from "../shared/models/tool.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToolService} from "../services/tool.service";

@Component({
  selector: 'app-tool-details',
  templateUrl: './tool-details.component.html',
  styleUrls: ['./tool-details.component.scss']
})
export class ToolDetailsComponent implements OnInit {

  tool: Tool;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toolService: ToolService
  ) { }

  ngOnInit() {
    this.getTool();
  }

  getTool(): void {
    const toolId = +this.route.snapshot.paramMap.get('id');
    this.toolService.getTool(toolId).subscribe(tool => this.tool = tool);
  }

  deleteTool() {
    let confirmDelete = confirm(`Delete tool ${this.tool.name}?`);
    if (confirmDelete) {
      this.toolService.deleteTool(this.tool.id).subscribe(
        () => {
          this.router.navigateByUrl('/tool');
        },
        error => {
          alert(`Could not delete tool! Are all qualifications removed? \n${error}`);
        });
    }
  }
}
