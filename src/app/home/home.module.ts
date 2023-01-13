import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {ArticleModule} from "../article/article.module";
import {PaginationModule} from "../pagination/pagination.module";
import {HeaderFooterModule} from "../header-footer/header-footer-module";
import {FilmModule} from "../film/film.module";



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    ArticleModule,
    PaginationModule,
    HeaderFooterModule,
    FilmModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomeModule { }
