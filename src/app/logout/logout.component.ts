import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  logoutMessage = "";

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginService.doLogout();
    this.logoutMessage = `You are now logged out. Goodbye.`;

    setTimeout(() => this.router.navigateByUrl('/'), 2000);
  }
}
