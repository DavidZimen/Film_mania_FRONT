import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ArticleInMainListDto} from "../../dto/article-in-main-list-dto";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userId: number | undefined;

  articles: ArticleInMainListDto[] = [];
  displayedArticles: ArticleInMainListDto[] = [];
  allPages!: number;
  itemsPerPage: number = 10;

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe((user) => {
      if (user === null) {
        this.userId = undefined;
      } else {
        this.userId = user.user?.id;
      }
    })
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
