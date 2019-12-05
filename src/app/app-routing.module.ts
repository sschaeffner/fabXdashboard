import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./users/users.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserCreateComponent } from "./user-create/user-create.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { UserCardComponent } from "./user-card/user-card.component";
import {QualificationsComponent} from "./qualifications/qualifications.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path : 'user', component: UsersComponent },
  { path : 'user/create', component: UserCreateComponent },
  { path : 'user/:id', component: UserDetailsComponent },
  { path : 'user/:id/edit', component: UserEditComponent },
  { path : 'user/:id/setCard', component: UserCardComponent },
  { path : 'qualification', component: QualificationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
