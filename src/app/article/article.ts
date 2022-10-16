import {Author} from "./author";

export class Article {
  artTitle: String | undefined;
  artParagraph: String | undefined;
  imgSource: String | undefined;
  artAuthor: Author;

  constructor(artTitle: String | undefined, artParagraph: String | undefined, imgSource: String | undefined, artAuthor: Author) {
    this.artTitle = artTitle;
    this.artParagraph = artParagraph;
    this.imgSource = imgSource;
    this.artAuthor = artAuthor;
  }
}
