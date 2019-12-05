import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { httpInterceptorProviders } from "./http-interceptors";
import { NgProgressModule } from "@ngx-progressbar/core";
import { NgProgressHttpModule } from "@ngx-progressbar/http";
import { UserCardComponent } from './user-card/user-card.component';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { QualificationBubbleComponent } from './qualification-bubble/qualification-bubble.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { QualificationsComponent } from './qualifications/qualifications.component';
import { DevicesComponent } from './devices/devices.component';
import { ToolsComponent } from './tools/tools.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailsComponent,
    UserCreateComponent,
    UserEditComponent,
    LoginComponent,
    LogoutComponent,
    UserCardComponent,
    QualificationBubbleComponent,
    QualificationsComponent,
    DevicesComponent,
    ToolsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgProgressModule.withConfig({
      color: '#FA9112',
      spinner: false
    }),
    NgProgressHttpModule,
    ZXingScannerModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
