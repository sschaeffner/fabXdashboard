import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditUser} from "../shared/models/edit-user.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  error = "";

  user: User;

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    wikiName: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    locked: new FormControl(''),
    lockedReason: new FormControl('')
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => {
      this.user = user;

      this.form.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        wikiName: this.user.wikiName,
        phoneNumber: this.user.phoneNumber,
        locked: this.user.locked,
        lockedReason: this.user.lockedReason
      });
    });
  }

  onSubmit() {
    let editUser = new EditUser();
    editUser.firstName = this.form.get('firstName').value;
    editUser.lastName = this.form.get('lastName').value;
    editUser.wikiName = this.form.get('wikiName').value;
    editUser.phoneNumber = this.form.get('phoneNumber').value;
    editUser.locked = this.form.get('locked').value;
    editUser.lockedReason = this.form.get('lockedReason').value;

    this.userService.editUser(this.user.id, editUser)
      .subscribe(
        () => {
          console.log("user successfully edited");
          this.router.navigateByUrl(`/user/${this.user.id}`);
        },
        error => {
          this.error = error;
          console.error("user not successfully edited: %o", error);
        }
      );
  }
}
