import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing-module/app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import {LoginRegisterModule} from "./login-register/login-register.module";
import {HeaderFooterModule} from "./header-footer/header-footer-module";
import {ArticleModule} from "./article/article.module";
import {FilmModule} from "./film/film.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginRegisterModule,
    HeaderFooterModule,
    ArticleModule,
    FilmModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
