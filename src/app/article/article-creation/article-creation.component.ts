import {Component, OnInit, ViewChild} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ArticleCreation} from "../../dto/article-creation";
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  writtenArticle: ArticleCreation;
  uploadedImage!: File;
  @ViewChild('closeButton') closeButton: any;

  constructor(private articleService: ArticleService, private userService: UserService, private toastService: ToastService, private router: Router) {
    this.writtenArticle = new ArticleCreation();
    this.userService.loggedInUser$.subscribe((user) => {
      this.writtenArticle.author_email = user?.user?.email;
    })
  }

  ngOnInit(): void {

  }

  onSubmitArticle(form: NgForm): void {
    if (form.valid) {

      if (this.uploadedImage === undefined) {
        this.uploadArticle();
        return;
      }

      const articleImage = new FormData();
      articleImage.append('image', this.uploadedImage);

      this.articleService.uploadArticleImage(articleImage).subscribe({
        next: (imageId) => {
          this.writtenArticle.image_id = imageId;

          this.uploadArticle();
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.showErrorToast("Chyba pri ukladaní obrázku v článku", "");
        },
        complete: () => {}
      });
    }
  }

  public onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

  uploadArticle(): void {
    this.articleService.addArticle(this.writtenArticle).subscribe(
      {
        next: (data) => {
          //this.closeButton.nativeElement.click();
          this.writtenArticle = new ArticleCreation();
          this.toastService.showSuccessToast("Článok úspešne napísaný", "");
          setTimeout( () => { this.router.navigate(['articles_list']) }, 500)
        },
        error: () => {
          this.toastService.showErrorToast("Chyba pri ukladaní článku", "");
        },
        complete: () => {}
      });
  }
}
