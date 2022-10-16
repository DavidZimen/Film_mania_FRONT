import { Component, OnInit } from '@angular/core';
import { Article } from "../article";
import { LoremIpsum } from "lorem-ipsum";
import { Author } from "../author";


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

@Component({
  selector: 'app-article-list-component',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "assets/1.jpg", new Author('Dusike', "assets/5.jpg")),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "assets/2.jpg", new Author('Janike', "assets/3.jpg")),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "assets/3.jpg", new Author('Dusike', "assets/5.jpg")),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "assets/4.jpg", new Author('Majike', "assets/4.jpg")),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "assets/5.jpg", new Author('Dusike', "assets/5.jpg")),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "assets/6.jpg", new Author('Dusike', "assets/5.jpg")),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "assets/7.jpg", new Author('Ferike', "assets/1.jpg")),
  ];

  constructor() {
  }


  ngOnInit(): void { }
}


