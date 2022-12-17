import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Article} from "../../entities/article";
import {ArticleCreation} from "../../dto/article-creation";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  writtenArticle: ArticleCreation;
  @ViewChild('closeButton') closeButton: any;
  @Output() newArticleEvent = new EventEmitter<boolean>();
  @Input() updateArticle: Article | undefined;

  constructor(private articleService: ArticleService) {
    this.writtenArticle = new ArticleCreation();
  }

  ngOnInit(): void {

  }

  onSubmitArticle(form: NgForm): void {
    if (form.valid) {
      this.articleService.addArticle(this.writtenArticle).subscribe(
        {
          next: (data) => {
            this.closeButton.nativeElement.click();
            this.writtenArticle = new ArticleCreation();
            this.newArticleEvent.emit(true);
          },
          error: () => {
            alert('Something went wrong.');
          },
          complete: () => {}
        }
      )
    }
  }

  onSubmitUpdateArticle(form: NgForm): void {
    if (form.valid && this.updateArticle) {
      this.articleService.updateArticle(this.updateArticle).subscribe(
        {
          next: (data) => {
            this.closeButton.nativeElement.click();
            this.writtenArticle = new ArticleCreation();
            this.newArticleEvent.emit(true);
          },
          error: () => {
            alert('Something went wrong.');
          },
          complete: () => {}
        }
      )
    }
  }
}
