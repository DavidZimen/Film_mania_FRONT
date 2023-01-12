import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ArticleService} from "../../services/article.service";
import {ArticleInAuthorListDto} from "../../dto/article-in-author-list-dto";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {

  uploadedImage!: File;
  @ViewChild('closeButton') closeButton: any;
  @Input() updatingArticle!: ArticleInAuthorListDto;

  constructor(private articleService: ArticleService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  onSubmitUpdateArticle(form: NgForm): void {
    if (form.valid) {

      if (this.uploadedImage === undefined) {
        this.updateArticle();
        return;
      }

      const articleImage = new FormData();
      articleImage.append('image', this.uploadedImage, `${this.updatingArticle.articleImage.id}`);

      this.articleService.updateArticleImage(articleImage).subscribe(
        {
          next: (data) => {
            this.updateArticle();
          },
          error: () => {
            this.toastService.showErrorToast("Došlo ku chybe pri aktualizovaní obrázka článku.", "");
          },
          complete: () => {}
        }
      )
    }
  }

  updateArticle(): void {
    this.articleService.updateArticle(this.updatingArticle).subscribe(
      {
        next: (data) => {
          this.closeButton.nativeElement.click();
          this.toastService.showSuccessToast("Článok úspešne aktualizovaný.", "");
        },
        error: () => {
          this.toastService.showErrorToast("Chyba pri aktualizovaní článku", "");
        },
        complete: () => {}
      });
  }

}
