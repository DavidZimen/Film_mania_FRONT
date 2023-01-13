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
import {ToastModule} from "./toast/toast.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HomeModule} from "./home/home.module";
import {PaginationModule} from "./pagination/pagination.module";

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        LoginRegisterModule,
        HeaderFooterModule,
        ArticleModule,
        FilmModule,
        ToastModule,
        HomeModule,
        PaginationModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
