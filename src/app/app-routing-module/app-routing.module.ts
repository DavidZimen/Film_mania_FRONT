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
import {AdminFilmComponent} from "../admin/admin-film/admin-film.component";
import {AdminDerictorComponent} from "../admin/admin-derictor/admin-derictor.component";
import {AdminActorComponent} from "../admin/admin-actor/admin-actor.component";
import {AdminActorAddComponent} from "../admin/admin-actor-add/admin-actor-add.component";
import {AdminActorUpdateComponent} from "../admin/admin-actor-update/admin-actor-update.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'films_list', component: FilmListComponent },
  { path: 'article/:artId', component: ArticleDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'article_creation', component: ArticleCreationComponent },
  { path: 'author_articles/:authorId', component: AuthorArticlesComponent },
  { path: 'article_update/:authorId/:articleId', component: ArticleUpdateComponent },
  { path: 'admin_film/:admin_id', component: AdminFilmComponent },
  { path: 'admin_director/:admin_id', component: AdminDerictorComponent },
  {
    path: 'admin_actor/:admin_id',
    children: [
      { path: "", pathMatch: "full", component: AdminActorComponent},
      { path: 'add_actor', component: AdminActorAddComponent },
      { path: 'update_actor/:actor_id', component: AdminActorUpdateComponent }
    ]
  },
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
