import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = "";

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    let username = this.form.get('username').value;
    let password = this.form.get('password').value;

    this.loginService.doLogin(username, password).subscribe(val => {
      console.log("login successful: %o", val);
      this.error = "";

      this.router.navigateByUrl(`/user`);

    }, err => {
      console.log("login error: %o", err);
      this.error = `Login error: ${err.status} ${err.statusText}`;
    })
  }
}
