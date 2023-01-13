import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ArticleService} from "../../services/article.service";
import {ArticleInAuthorListDto} from "../../dto/article-in-author-list-dto";
import {ToastService} from "../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {

  uploadedImage!: File;
  updatingArticleId!: number;
  authorId!: number;
  updatingArticle: ArticleInAuthorListDto | undefined;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.updatingArticleId = Number(this.route.snapshot.paramMap.get('articleId'));
    this.authorId = Number(this.route.snapshot.paramMap.get('authorId'));
    this.articleService.getArticleById(this.updatingArticleId).toPromise().then(res => this.updatingArticle = res);
  }

  onSubmitUpdateArticle(form: NgForm): void {
    if (form.valid) {

      if (this.uploadedImage === undefined) {
        this.updateArticle();
        return;
      }

      const articleImage = new FormData();
      this.updatingArticle!.articleImage === null ? articleImage.append('image', this.uploadedImage) : articleImage.append(`${this.updatingArticle!.articleImage.id}`, this.uploadedImage);

      this.articleService.updateArticleImage(articleImage).subscribe(
        {
          next: (data) => {
            this.updateArticle();

          },
          error: () => {
            this.toastService.showErrorToast("Došlo ku chybe pri aktualizovaní obrázka článku.");
          },
          complete: () => {}
        }
      )
    }
  }

  updateArticle(): void {
    this.articleService.updateArticle(this.updatingArticle!).subscribe(
      {
        next: (data) => {
          this.toastService.showSuccessToast("Článok úspešne aktualizovaný.");
          setTimeout(() => this.router.navigate(['/author_articles', this.authorId]), 500);
        },
        error: () => {
          this.toastService.showErrorToast("Chyba pri aktualizovaní článku");
        },
        complete: () => {}
      });
  }

  public onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

}
