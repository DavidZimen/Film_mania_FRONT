import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ArticleListComponent } from "../article/article-list-component/article-list.component";
import {FilmListComponent} from "../film/film-list/film-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/articles_list', pathMatch: 'full' },
  { path: 'articles_list', component: ArticleListComponent },
  { path: 'films_list', component: FilmListComponent }
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
