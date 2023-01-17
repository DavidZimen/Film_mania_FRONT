import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFilmComponent } from './film/admin-film/admin-film.component';
import { AdminDirectorComponent } from './director/admin-derictor/admin-director.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing-module/app-routing.module";
import {NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HeaderFooterModule} from "../header-footer/header-footer-module";
import { AdminActorComponent } from './actor/admin-actor/admin-actor.component';
import { AdminActorAddComponent } from './actor/admin-actor-add/admin-actor-add.component';
import { AdminActorUpdateComponent } from './actor/admin-actor-update/admin-actor-update.component';
import { AdminDirectorAddComponent } from './director/admin-director-add/admin-director-add.component';
import { AdminDirectorUpdateComponent } from './director/admin-director-update/admin-director-update.component';
import { AdminGenreComponent } from './genre/admin-genre/admin-genre.component';
import { AdminFilmAddComponent } from './film/admin-film-add/admin-film-add.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { AdminFilmUpdateComponent } from './film/admin-film-update/admin-film-update.component';



@NgModule({
  declarations: [
    AdminFilmComponent,
    AdminActorComponent,
    AdminActorAddComponent,
    AdminActorUpdateComponent,
    AdminDirectorComponent,
    AdminDirectorAddComponent,
    AdminDirectorUpdateComponent,
    AdminGenreComponent,
    AdminFilmAddComponent,
    AdminFilmUpdateComponent
  ],
    imports: [
        CommonModule,
        HeaderFooterModule,
        FormsModule,
        AppRoutingModule,
        NgbModule,
        NgbModalModule,
        NgMultiSelectDropDownModule,
        ReactiveFormsModule
    ],
  exports: [
    AdminFilmComponent,
    AdminActorComponent,
    AdminActorAddComponent,
    AdminActorUpdateComponent,
    AdminDirectorComponent,
    AdminDirectorAddComponent,
    AdminDirectorUpdateComponent,
    AdminGenreComponent,
    AdminFilmAddComponent
  ]
})
export class AdminModule { }
