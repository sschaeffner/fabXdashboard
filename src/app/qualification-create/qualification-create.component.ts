import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QualificationService} from "../services/qualification.service";
import {Router} from "@angular/router";
import {NewQualification} from "../shared/models/new-qualification.model";
import {Qualification} from "../shared/models/qualification.model";

@Component({
  selector: 'app-qualification-create',
  templateUrl: './qualification-create.component.html',
  styleUrls: ['./qualification-create.component.scss']
})
export class QualificationCreateComponent implements OnInit {

  error = "";

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    colour: new FormControl('#000000', Validators.required),
    orderNr: new FormControl('1', Validators.required)
  });

  constructor(
    private qualificationService: QualificationService,
    private router: Router
  ) { }

  ngOnInit() {}

  onSubmit() {
    let newQualification = new NewQualification();
    newQualification.name = this.form.get('name').value;
    newQualification.description = this.form.get('description').value;
    newQualification.colour = this.form.get('colour').value;
    newQualification.orderNr = this.form.get('orderNr').value;

    this.qualificationService.createNewQualification(newQualification)
      .subscribe(
        (qualification: Qualification) => {
          console.log("new qualification successfully created: %o", qualification);
          this.router.navigateByUrl(`/qualification`);
        },
        error => {
          this.error = error;
          console.error("newQualification not successfullt created: %o", error);
        }
      );
  }
}
