import {NgModule} from "@angular/core";
import {FooterComponent} from "./footer/footer.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing-module/app-routing.module";

@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent
  ] ,
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    FooterComponent,
    NavBarComponent
  ]
})
export class HeaderFooterModule { }
