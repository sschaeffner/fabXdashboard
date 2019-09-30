import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user.model";
import {Qualification} from "../shared/models/qualification.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    /*let qualification1 = new Qualification();
    qualification1.id = 1;
    qualification1.name = "First Qualification";
    qualification1.description = "Some qualification description.";

    let user1 = new User();
    user1.id = 1;
    user1.name = "First User";
    user1.qualifications = [qualification1];

    this.users.push(user1);*/
    this.getUsers();
  }

  public getUsers() {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }
}
