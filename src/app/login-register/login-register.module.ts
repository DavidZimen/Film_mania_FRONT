import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterLinkWithHref} from "@angular/router";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterLinkWithHref
    ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginRegisterModule { }
