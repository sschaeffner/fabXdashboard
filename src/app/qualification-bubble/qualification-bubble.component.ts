import {Component, Input, OnInit} from '@angular/core';
import {Qualification} from "../shared/models/qualification.model";

@Component({
  selector: 'app-qualification-tag',
  templateUrl: './qualification-bubble.component.html',
  styleUrls: ['./qualification-bubble.component.scss']
})
export class QualificationBubbleComponent implements OnInit {

  noSmallStyle = {
    'font-size': 'initial',
    'width': 'initial',
    'height': 'initial',
    'padding': '5px 10px',
  };

  @Input()
  qualification: Qualification;

  @Input()
  smallTags: boolean = false;

  constructor() { }

  ngOnInit() {}

}
