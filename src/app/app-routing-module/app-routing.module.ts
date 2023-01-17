import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import {FilmListComponent} from "../film/film-list/film-list.component";
import {ArticleDetailComponent} from "../article/article-detail/article-detail.component";
import {RegisterComponent} from "../login-register/register/register.component";
import {ArticleCreationComponent} from "../article/article-creation/article-creation.component";
import {AuthorArticlesComponent} from "../article/author-articles/author-articles.component";
import {ArticleUpdateComponent} from "../article/article-update/article-update.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {HomePageComponent} from "../home/home-page/home-page.component";
import {AdminFilmComponent} from "../admin/film/admin-film/admin-film.component";
import {AdminDirectorComponent} from "../admin/director/admin-derictor/admin-director.component";
import {AdminActorComponent} from "../admin/actor/admin-actor/admin-actor.component";
import {AdminActorAddComponent} from "../admin/actor/admin-actor-add/admin-actor-add.component";
import {AdminActorUpdateComponent} from "../admin/actor/admin-actor-update/admin-actor-update.component";
import {AdminDirectorUpdateComponent} from "../admin/director/admin-director-update/admin-director-update.component";
import {AdminDirectorAddComponent} from "../admin/director/admin-director-add/admin-director-add.component";
import {AdminGenreComponent} from "../admin/genre/admin-genre/admin-genre.component";
import {AdminFilmAddComponent} from "../admin/film/admin-film-add/admin-film-add.component";
import {FilmDetailComponent} from "../film/film-detail/film-detail.component";
import {AdminFilmUpdateComponent} from "../admin/film/admin-film-update/admin-film-update.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'films_list', children: [
      { path: "", pathMatch: "full", component: FilmListComponent },
      { path: "film/:film_id", component: FilmDetailComponent }
    ]
  },
  { path: 'article/:artId', component: ArticleDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'article_creation', component: ArticleCreationComponent },
  { path: 'author_articles/:authorId', component: AuthorArticlesComponent },
  { path: 'article_update/:authorId/:articleId', component: ArticleUpdateComponent },
  {
    path: 'admin_film/:admin_id',
    children: [
      { path: "", pathMatch: "full", component: AdminFilmComponent },
      { path: 'add_film', component: AdminFilmAddComponent },
      { path: 'update_film/:film_id', component: AdminFilmUpdateComponent }
    ]
  },
  {
    path: 'admin_actor/:admin_id',
    children: [
      { path: "", pathMatch: "full", component: AdminActorComponent},
      { path: 'add_actor', component: AdminActorAddComponent },
      { path: 'update_actor/:actor_id', component: AdminActorUpdateComponent }
    ]
  },
  {
    path: 'admin_director/:admin_id',
    children: [
      { path: "", pathMatch: "full", component: AdminDirectorComponent},
      { path: 'add_director', component: AdminDirectorAddComponent },
      { path: 'update_director/:director_id', component: AdminDirectorUpdateComponent }
    ]
  },
  { path: 'admin_genre/:admin_id', component: AdminGenreComponent },
  { path: '**', component: PageNotFoundComponent }
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
