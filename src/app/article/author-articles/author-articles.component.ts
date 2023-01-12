import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ArticleInAuthorListDto} from "../../dto/article-in-author-list-dto";
import {ArticleService} from "../../services/article.service";
import {ToastService} from "../../services/toast.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-author-articles',
  templateUrl: './author-articles.component.html',
  styleUrls: ['./author-articles.component.css']
})
export class AuthorArticlesComponent implements OnInit {

  articles: ArticleInAuthorListDto[] = [];
  @Input() authorId!: number;
  @ViewChild('closeButton') closeButton: any;

  constructor(private articleService: ArticleService, private toastService: ToastService, private route: ActivatedRoute) {
    this.authorId = +this.route.snapshot.paramMap.get('authorId')!;
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
        this.toastService.showErrorToast("Chyba pri načítavaní článkov.", "");
      },
      complete: () => {}
    });
  }

  deleteArticle(articleId: number): void {
    console.log(articleId);
    this.articleService.deleteArticle(articleId).subscribe({
      next: (res) => {
        this.loadAuthorArticles();
        this.toastService.showSuccessToast("Článok úspešne vymazaný.", "");
        this.closeButton.nativeElement.click();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showErrorToast("Chyba pri mazaní článku", "");
      },
      complete: () => {}
    });
  }
}
