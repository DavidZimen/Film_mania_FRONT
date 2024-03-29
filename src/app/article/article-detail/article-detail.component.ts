import { Component, OnInit } from '@angular/core';
import {Article} from "../../entities/article";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import {ArticleInMainListDto} from "../../dto/article-in-main-list-dto";



@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  detailedArticle: ArticleInMainListDto | undefined;
  articleId : number;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {
    this.articleId = Number(this.route.snapshot.paramMap.get('artId'));
  }

  ngOnInit(): void {
    this.loadOneArticle(this.articleId);
  }

  loadOneArticle(id: number): void {
    this.articleService.getArticleById(id).subscribe(
      (article) => this.detailedArticle = article
    );
  }

}
