import {Component, ElementRef, OnInit} from '@angular/core';
import {User} from "../shared/models/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditUser} from "../shared/models/edit-user.model";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  error = "";

  user: User;

  form = new FormGroup({
    cardIdAndSecret: new FormControl('', Validators.required)
  });
  qrCodeReading: boolean = false;

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

      if (this.user.cardId) {
        this.form.patchValue({
          cardIdAndSecret: `${this.user.cardId}\n${this.user.cardSecret}`
        })
      }
    });
  }

  onSubmit() {
    let idAndSecret: string = this.form.get('cardIdAndSecret').value;
    let idAndSecretArray: string[] = idAndSecret.split(/\r?\n/);

    if (idAndSecretArray.length != 2) {
      this.error = "First line: cardId, second line: cardSecret!";
      return;
    }

    console.log("idAndSecretArray=%o", idAndSecretArray);

    let editUser = new EditUser();
    editUser.cardId = idAndSecretArray[0];
    editUser.cardSecret = idAndSecretArray[1];

    if (editUser.cardId.length != 14) {
      this.error = "cardId has to be 7 Byte (14 characters in hex) long!";
      return;
    }

    if (editUser.cardSecret.length != 64) {
      this.error = "cardSecret has to be 32 Byte (64 characters in hex) long!"
      return;
    }

    this.userService.editUser(this.user.id, editUser)
      .subscribe(
        () => {
          console.log("user card successfully edited");
          this.router.navigateByUrl(`/user/${this.user.id}`);
        },
        error => {
          this.error = error;
          console.error("user card not successfully edited: %o", error);
        }
      );
  }

  qrCodeReader() {
    console.log("qr");
    this.qrCodeReading = true;
  }

  onQrSuccess(event: string) {
    console.log(`qr success: ${event}`);

    this.qrCodeReading = false;

    this.form.patchValue({
      cardIdAndSecret: event
    })
  }
}
