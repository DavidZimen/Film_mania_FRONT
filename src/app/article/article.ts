import {Author} from "./author";

export class Article {
  artId: number | undefined;
  artTitle: String | undefined;
  artParagraph: String | undefined;
  imgSource: String | undefined;
  artAuthor: Author;

  constructor(artId: number | undefined, artTitle: String | undefined, artParagraph: String | undefined, imgSource: String | undefined, artAuthor: Author) {
    this.artId = artId;
    this.artTitle = artTitle;
    this.artParagraph = artParagraph;
    this.imgSource = imgSource;
    this.artAuthor = artAuthor;
  }
}
