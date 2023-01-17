import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ArticleInMainListDto} from "../../dto/article-in-main-list-dto";

@Component({
  selector: 'app-article-list-component',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  @Input() articles: ArticleInMainListDto[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}


