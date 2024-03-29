import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleDetailComponent} from "./article-detail/article-detail.component";
import {ArticleCreationComponent} from "./article-creation/article-creation.component";
import {ArticleListComponent} from "./article-list-component/article-list.component";
import {HeaderFooterModule} from "../header-footer/header-footer-module";
import {FilmModule} from "../film/film.module";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing-module/app-routing.module";
import { ArticleUpdateComponent } from './article-update/article-update.component';
import { AuthorArticlesComponent } from './author-articles/author-articles.component';
import {NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ArticleCreationComponent,
    ArticleDetailComponent,
    ArticleListComponent,
    ArticleUpdateComponent,
    AuthorArticlesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeaderFooterModule,
    FilmModule,
    AppRoutingModule,
    NgbModule,
    NgbModalModule
  ],
  exports: [
    ArticleCreationComponent,
    ArticleDetailComponent,
    ArticleListComponent,
    ArticleUpdateComponent,
    AuthorArticlesComponent
  ]
})
export class ArticleModule { }
