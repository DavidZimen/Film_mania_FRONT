import {ArticleImage} from "../entities/article-image";

export class ArticleInMainListDto {
  constructor(
    public id: number,
    public title: string,
    public text: string,
    public articleImage: ArticleImage,
    public fisrtName: string,
    public lastName: string,
    public avatar: any) {
  }
}
