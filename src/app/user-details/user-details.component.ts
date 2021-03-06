import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Qualification} from "../shared/models/qualification.model";
import {QualificationService} from "../services/qualification.service";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  qualifications: Qualification[];
  qualificationsForUser: {[k: number]: boolean} = {};


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private qualificationService: QualificationService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const userId = +this.route.snapshot.paramMap.get('id');

    let userObs: Observable<User> = this.userService.getUser(userId);//.subscribe(user => this.user = user);
    let qualificationsObs: Observable<Qualification[]> = this.qualificationService.getAllQualifications();

    forkJoin([userObs, qualificationsObs]).subscribe(responseList => {
      console.log("userObs result: %o", responseList[0]);
      console.log("qualificationsObs result: %o", responseList[1]);

      responseList[1].forEach(qualification => {       // for all qualifications
        this.qualificationsForUser[qualification.id] = // set qualificationsForUser
          responseList[0].qualifications.some(q => {   // some in user's qualification
            return q.id == qualification.id;           // with same id as outer qualification
          })
      });

      this.user = responseList[0];
      this.qualifications = responseList[1];
    });
  }

  toggleQualification(id: number, newValue: boolean): void {
    console.log("toggling qualification %o to %o", id, newValue);
    if (newValue) {
      this.userService.addQualification(this.user.id, id).subscribe(
        () => {
          console.log("addQualification successful");
        },
        error => {
          console.log("addQualification not successful: %o", error)
        });
    } else {
      this.userService.removeQualification(this.user.id, id).subscribe(
        () => {
          console.log("removeQualification successful");
        },
        error => {
          console.log("removeQualification not successful: %o", error)
        });
    }
  }

  deleteUser() {
    let confirmDelete = confirm(`Delete user ${this.user.firstName} ${this.user.lastName}?`);
    if (confirmDelete) {
      this.userService.deleteUser(this.user.id).subscribe(
        () => {
          this.router.navigateByUrl('/user');
        },
        error => {
          alert(`Could not delete user! Are all qualifications removed? \n${error}`);
          console.log("");
        });
    }
  }
}
