import {ArticleImage} from "../entities/article-image";

export class ArticleInAuthorListDto {
  constructor(
    public id: number,
    public title: string,
    public text: string,
    public articleImage: ArticleImage
  ) {
  }
}
