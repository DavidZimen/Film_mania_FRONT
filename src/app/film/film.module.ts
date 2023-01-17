import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecFilmCardComponent} from "./rec-film-card/rec-film-card.component";
import {FilmListComponent} from "./film-list/film-list.component";
import {HeaderFooterModule} from "../header-footer/header-footer-module";
import {NgbModalModule, NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import { RateFilmComponent } from './rate-film/rate-film.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    RecFilmCardComponent,
    FilmListComponent,
    RateFilmComponent,
    FilmDetailComponent
  ],
  imports: [
    CommonModule,
    HeaderFooterModule,
    NgbRatingModule,
    NgbModalModule,
    RouterLink
  ],
  exports: [
    RecFilmCardComponent,
    FilmListComponent
  ]
})
export class FilmModule { }
