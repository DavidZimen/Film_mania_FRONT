import {NgModule} from "@angular/core";
import {FooterComponent} from "./footer/footer.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing-module/app-routing.module";
import {LoginRegisterModule} from "../login-register/login-register.module";
import {AvatarComponent} from "./avatar/avatar.component";

@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent,
    AvatarComponent
  ] ,
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    LoginRegisterModule
  ],
  exports: [
    FooterComponent,
    NavBarComponent,
    AvatarComponent
  ]
})
export class HeaderFooterModule { }
