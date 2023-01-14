import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFilmComponent } from './admin-film/admin-film.component';
import { AdminDerictorComponent } from './admin-derictor/admin-derictor.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing-module/app-routing.module";
import {NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HeaderFooterModule} from "../header-footer/header-footer-module";
import { AdminActorComponent } from './admin-actor/admin-actor.component';
import { AdminActorAddComponent } from './admin-actor-add/admin-actor-add.component';
import { AdminActorUpdateComponent } from './admin-actor-update/admin-actor-update.component';



@NgModule({
  declarations: [
    AdminFilmComponent,
    AdminDerictorComponent,
    AdminActorComponent,
    AdminActorAddComponent,
    AdminActorUpdateComponent
  ],
  imports: [
    CommonModule,
    HeaderFooterModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NgbModalModule
  ],
  exports: [
    AdminFilmComponent,
    AdminDerictorComponent,
    AdminActorComponent,
    AdminActorAddComponent,
    AdminActorUpdateComponent
  ]
})
export class AdminModule { }
