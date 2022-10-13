import { Component, OnInit } from '@angular/core';
import {Article} from "../article";
import {LoremIpsum} from "lorem-ipsum";


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
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "src/assets/1.jpg"),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "src/assets/2.jpg"),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "src/assets/3.jpg"),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "src/assets/4.jpg"),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "src/assets/5.jpg"),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "src/assets/6.jpg"),
    new Article("Nejaky nazov", lorem.generateParagraphs(2), "src/assets/7.jpg"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
