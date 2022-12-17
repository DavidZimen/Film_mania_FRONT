import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecFilmCardComponent} from "./rec-film-card/rec-film-card.component";
import {FilmListComponent} from "./film-list/film-list.component";
import {HeaderFooterModule} from "../header-footer/header-footer-module";



@NgModule({
  declarations: [
    RecFilmCardComponent,
    FilmListComponent
  ],
  imports: [
    CommonModule,
    HeaderFooterModule
  ],
  exports: [
    RecFilmCardComponent,
    FilmListComponent
  ]
})
export class FilmModule { }
