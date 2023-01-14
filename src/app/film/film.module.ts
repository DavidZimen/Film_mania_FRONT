import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecFilmCardComponent} from "./rec-film-card/rec-film-card.component";
import {FilmListComponent} from "./film-list/film-list.component";
import {HeaderFooterModule} from "../header-footer/header-footer-module";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import { RateFilmComponent } from './rate-film/rate-film.component';



@NgModule({
  declarations: [
    RecFilmCardComponent,
    FilmListComponent,
    RateFilmComponent
  ],
  imports: [
    CommonModule,
    HeaderFooterModule,
    NgbRatingModule
  ],
  exports: [
    RecFilmCardComponent,
    FilmListComponent
  ]
})
export class FilmModule { }
