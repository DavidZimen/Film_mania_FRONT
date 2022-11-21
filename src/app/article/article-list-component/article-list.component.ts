import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Article } from "../article";
import { LoremIpsum } from "lorem-ipsum";
import { Author } from "../author";
import {ArticleService} from "../../services/article.service";
import {Observable, Subscription} from "rxjs";


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

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
        next: (data) => {
          this.loadArticles();
        },
        error: (e) => { alert('Doslo ku chybe.') },
        complete: () => {}
      }
    );
    this.closeButton.nativeElement.click();
  }
}


