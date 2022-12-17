import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ArticleListComponent } from "../article/article-list-component/article-list.component";
import {FilmListComponent} from "../film/film-list/film-list.component";
import {ArticleDetailComponent} from "../article/article-detail/article-detail.component";
import {LoginComponent} from "../login-register/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/articles_list', pathMatch: 'full' },
  { path: 'articles_list', component: ArticleListComponent },
  { path: 'films_list', component: FilmListComponent },
  { path: 'article/:artId', component: ArticleDetailComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
