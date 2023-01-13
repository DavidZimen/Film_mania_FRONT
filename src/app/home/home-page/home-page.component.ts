import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ArticleInMainListDto} from "../../dto/article-in-main-list-dto";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  articles: ArticleInMainListDto[] = [];
  displayedArticles: ArticleInMainListDto[] = [];
  allPages!: number;
  itemsPerPage: number = 10;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (res) => {
        this.articles = res;
        this.onPageChange();
        this.allPages = Math.ceil(this.articles.length / this.itemsPerPage);
      }
    );
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.displayedArticles = this.articles.slice(startItem, endItem);
  }

}
