import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {UserService} from "../services/user.service";
import {NewUser} from "../shared/models/new-user.model";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    wikiName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    let newUser = new NewUser();
    newUser.name = this.form.get('name').value;
    newUser.wikiName = this.form.get('wikiName').value;
    newUser.phoneNumber = this.form.get('phoneNumber').value;

    this.userService.createNewUser(newUser).subscribe(r => console.log("newUser result: %o", r));
    console.log(this.form.value);
    console.log(newUser);
  }

}
