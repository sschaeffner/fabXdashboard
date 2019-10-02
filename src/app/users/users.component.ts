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
    this.getUsers();
  }

  public getUsers() {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }
}
