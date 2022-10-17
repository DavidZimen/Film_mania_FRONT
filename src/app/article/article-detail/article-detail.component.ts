import { Component, OnInit } from '@angular/core';
import {Article} from "../article";
import {Author} from "../author";
import {LoremIpsum} from "lorem-ipsum";
import {ActivatedRoute} from "@angular/router";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 50,
    min: 40
  },
  wordsPerSentence: {
    max: 30,
    min: 10
  }
});

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  articles: Article[] = [
    new Article(0,"Nejaky nazov", lorem.generateParagraphs(2), "assets/1.jpg", new Author('Dusike', "assets/5.jpg")),
    new Article(1,"Nejaky nazov", lorem.generateParagraphs(2), "assets/1.jpg", new Author('Dusike', "assets/5.jpg")),
    new Article(2,"Nejaky nazov", lorem.generateParagraphs(2), "assets/2.jpg", new Author('Janike', "assets/3.jpg")),
    new Article(3,"Nejaky nazov", lorem.generateParagraphs(2), "assets/3.jpg", new Author('Dusike', "assets/5.jpg")),
    new Article(4,"Nejaky nazov", lorem.generateParagraphs(2), "assets/4.jpg", new Author('Majike', "assets/4.jpg")),
    new Article(5,"Nejaky nazov", lorem.generateParagraphs(2), "assets/5.jpg", new Author('Dusike', "assets/5.jpg")),
    new Article(6,"Nejaky nazov", lorem.generateParagraphs(2), "assets/6.jpg", new Author('Dusike', "assets/5.jpg")),
    new Article(7,"Nejaky nazov", lorem.generateParagraphs(2), "assets/7.jpg", new Author('Ferike', "assets/1.jpg")),
  ];

  detailedArticle: Article;

  constructor(private route: ActivatedRoute) {
    let id = Number(this.route.snapshot.paramMap.get('artId'));
    console.log(id);
    this.detailedArticle = this.articles[id];
  }

  ngOnInit(): void {
  }

}
