import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ArticleInAuthorListDto} from "../../dto/article-in-author-list-dto";
import {ArticleService} from "../../services/article.service";
import {ToastService} from "../../services/toast.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {PermissionService} from "../../services/permission.service";

@Component({
  selector: 'app-author-articles',
  templateUrl: './author-articles.component.html',
  styleUrls: ['./author-articles.component.css']
})
export class AuthorArticlesComponent implements OnInit {

  articles: ArticleInAuthorListDto[] = [];
  authorId!: number;

  constructor(
    private articleService: ArticleService,
    private permissionService: PermissionService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute)
  {
    this.authorId = +this.route.snapshot.paramMap.get('authorId')!;
    if (!this.permissionService.isCorrectAuthor(this.authorId)) {
      this.router.navigate(['**']);
    }
  }

  ngOnInit(): void {
    this.loadAuthorArticles();
  }

  loadAuthorArticles(): void {
    this.articleService.getArticlesOfAuthor(this.authorId).subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: err => {
        this.toastService.showErrorToast("Chyba pri načítavaní článkov.");
      },
      complete: () => {}
    });
  }

  deleteArticle(articleId: number): void {
    this.articleService.deleteArticle(articleId).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast("Článok úspešne vymazaný.");
        this.loadAuthorArticles();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showErrorToast("Chyba pri mazaní článku");
      },
      complete: () => {}
    });
  }
}
