import { Component, OnInit } from '@angular/core';
import {Qualification} from "../shared/models/qualification.model";
import {ActivatedRoute, Router} from "@angular/router";
import {QualificationService} from "../services/qualification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditQualification} from "../shared/models/edit-qualification.model";

@Component({
  selector: 'app-qualification-edit',
  templateUrl: './qualification-edit.component.html',
  styleUrls: ['./qualification-edit.component.scss']
})
export class QualificationEditComponent implements OnInit {

  error = "";

  qualification: Qualification;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    colour: new FormControl('', Validators.required),
    orderNr: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qualificationService: QualificationService
  ) { }

  ngOnInit() {
    this.getQualification();
  }

  getQualification() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.qualificationService.getQualification(id).subscribe(qualification => {
      this.qualification = qualification;

      this.form.patchValue({
        name: this.qualification.name,
        description: this.qualification.description,
        colour: this.qualification.colour,
        orderNr: this.qualification.orderNr
      });
    });
  }

  onSubmit() {
    let editQualification = new EditQualification();
    editQualification.name = this.form.get('name').value;
    editQualification.description = this.form.get('description').value;
    editQualification.colour = this.form.get('colour').value;
    editQualification.orderNr = this.form.get('orderNr').value;

    this.qualificationService.editQualification(this.qualification.id, editQualification)
      .subscribe(
        () => {
          console.log("qualification successfully edited");
          this.router.navigateByUrl(`/qualification/${this.qualification.id}`);
        },
        error => {
          this.error = error;
          console.error("qualification not successfully edited: %o", error);
        });
  }
}
