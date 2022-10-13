export class Article {
  artTitle: String | undefined;
  artParagraph: String | undefined;
  imgSource: String | undefined;

  constructor(artTitle: String | undefined, artParagraph: String | undefined, imgSource: String | undefined) {
    this.artTitle = artTitle;
    this.artParagraph = artParagraph;
    this.imgSource = imgSource;
  }
}
