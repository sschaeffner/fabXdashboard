import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {UserCardComponent} from "./user-card/user-card.component";
import {QualificationsComponent} from "./qualifications/qualifications.component";
import {DevicesComponent} from "./devices/devices.component";
import {ToolsComponent} from "./tools/tools.component";
import {ToolCreateComponent} from "./tool-create/tool-create.component";
import {QualificationCreateComponent} from "./qualification-create/qualification-create.component";
import {DeviceDetailsComponent} from "./device-details/device-details.component";
import {ToolDetailsComponent} from "./tool-details/tool-details.component";
import {QualificationDetailsComponent} from "./qualification-details/qualification-details.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path : 'user', component: UsersComponent },
  { path : 'user/create', component: UserCreateComponent },
  { path : 'user/:id', component: UserDetailsComponent },
  { path : 'user/:id/edit', component: UserEditComponent },
  { path : 'user/:id/setCard', component: UserCardComponent },
  { path : 'qualification', component: QualificationsComponent },
  { path : 'qualification/create', component: QualificationCreateComponent },
  { path : 'qualification/:id', component: QualificationDetailsComponent },
  { path : 'device', component: DevicesComponent },
  { path : 'device/:id', component: DeviceDetailsComponent },
  { path : 'tool', component: ToolsComponent },
  { path : 'tool/create', component: ToolCreateComponent },
  { path : 'tool/:id', component: ToolDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
