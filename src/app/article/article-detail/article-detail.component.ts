import { Component, OnInit } from '@angular/core';
import {Article} from "../article";
import {Author} from "../author";
import {LoremIpsum} from "lorem-ipsum";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ArticleService} from "../../services/article.service";



@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  detailedArticle: Article | undefined;
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
      article => { this.detailedArticle = article }
    )
  }

}
