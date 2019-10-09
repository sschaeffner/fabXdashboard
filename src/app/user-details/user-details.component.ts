import { Component, Input, OnInit } from '@angular/core';
import { User } from "../shared/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../services/user.service";
import { Qualification } from "../shared/models/qualification.model";
import { QualificationService } from "../services/qualification.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  qualifications: Qualification[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private qualificationService: QualificationService
  ) { }

  ngOnInit() {
    this.getUser();
    this.getQualifications();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  getQualifications(): void {
    this.qualificationService.getAllQualifications()
      .subscribe(qualifications => this.qualifications = qualifications);
  }
}
