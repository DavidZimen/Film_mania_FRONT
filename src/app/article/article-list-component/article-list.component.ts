import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Article } from "../../entities/article";
import { LoremIpsum } from "lorem-ipsum";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-article-list-component',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  @ViewChild('closeButton') closeButton: any;
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  ngOnDestroy(): void {
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe(
      res => { this.articles = res }
    )
  }

  deleteArticle(id: number): void {
    console.log(id);
    this.articleService.deleteArcticle(id).subscribe(
      {
        next: () => {
          this.loadArticles();
        },
        error: () => { alert('Doslo ku chybe.') },
        complete: () => {}
      }
    );
    this.closeButton.nativeElement.click();
  }
}


