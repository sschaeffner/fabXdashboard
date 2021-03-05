import { Component, OnInit } from '@angular/core';
import {Qualification} from "../shared/models/qualification.model";
import {ActivatedRoute, Router} from "@angular/router";
import {QualificationService} from "../services/qualification.service";

@Component({
  selector: 'app-qualification-details',
  templateUrl: './qualification-details.component.html',
  styleUrls: ['./qualification-details.component.scss']
})
export class QualificationDetailsComponent implements OnInit {

  qualification: Qualification;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qualificationService: QualificationService
  ) { }

  ngOnInit() {
    this.getQualification();
  }

  getQualification(): void {
    const qualificationId = +this.route.snapshot.paramMap.get('id');
    this.qualificationService.getQualification(qualificationId).subscribe(qualification => this.qualification = qualification);
  }

  deleteQualification() {
    let confirmDelete = confirm(`Delete qualification ${this.qualification.name}?`);
    if (confirmDelete) {
      this.qualificationService.deleteQualification(this.qualification.id).subscribe(
        () => {
          this.router.navigateByUrl('/qualification');
        },
        error => {
          alert(`Could not delete qualification! Are all references to qualification removed `
            + `(users having this qualification / device requiring this qualification)?\n${error}`);
        });
    }
  }
}
