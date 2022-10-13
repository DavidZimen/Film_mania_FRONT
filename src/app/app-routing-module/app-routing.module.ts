import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ArticleListComponent } from "../article/article-list-component/article-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/articles_list', pathMatch: 'full' },
  { path: 'articles_list', component: ArticleListComponent },
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
