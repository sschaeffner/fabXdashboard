import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../shared/models/user.model";
import {Qualification} from "../shared/models/qualification.model";
import {UserService} from "../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'qualifications'];

  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;

      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: User, filter: string) => {
        const userDataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
          // Use an obscure Unicode character to delimit the words in the concatenated string.
          // This avoids matches where the values of two columns combined will match the user's query
          // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
          // that has a very low chance of being typed in by somebody in a text field. This one in
          // particular is "White up-pointing triangle with dot" from
          // https://en.wikipedia.org/wiki/List_of_Unicode_characters
          return currentTerm + (data as {[key: string]: any})[key] + '◬';
        }, '').toLowerCase();

        const userQualificationsStr = data.qualifications.reduce((currentTerm: string, key: Qualification) => {
          return currentTerm + (key.name) + '◬';
        }, '').toLocaleLowerCase();

        const dataStr = userDataStr + userQualificationsStr;

        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();

        return dataStr.indexOf(transformedFilter) != -1;
      }
    });
  }
}
