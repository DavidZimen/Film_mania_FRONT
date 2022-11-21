import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Article} from "../article";
import {ArticleCreation} from "../article-creation";
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
          error: err => {
            alert('Something went wrong.');
          },
          complete: () => {}
        }
      )
    }
  }

}
