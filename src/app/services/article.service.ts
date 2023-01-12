import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleCreation} from "../dto/article-creation";
import {ArticleInMainListDto} from "../dto/article-in-main-list-dto";
import {ArticleInAuthorListDto} from "../dto/article-in-author-list-dto";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articlesUrl: string = "http://localhost:8080/articles"

  constructor(private http: HttpClient) { }

  public getAllArticles(): Observable<ArticleInMainListDto[]> {
    return this.http.get<ArticleInMainListDto[]>(`${this.articlesUrl}/all`);
  }

  public getArticleById(id: number): Observable<ArticleInMainListDto> {
    return this.http.get<ArticleInMainListDto>(`${this.articlesUrl}/${id}`);
  }

  public getArticlesOfAuthor(authorId: number): Observable<ArticleInAuthorListDto[]> {
    return this.http.get<ArticleInAuthorListDto[]>(`${this.articlesUrl}/author_articles/${authorId}`);
  }

  public deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.articlesUrl}/delete/${id}`);
  }

  public addArticle(articleCreation: ArticleCreation): Observable<ArticleInMainListDto> {
    return this.http.post<ArticleInMainListDto>(`${this.articlesUrl}/add`, articleCreation);
  }

  public updateArticle(article: ArticleInAuthorListDto): Observable<ArticleInAuthorListDto> {
    return this.http.put<ArticleInAuthorListDto>(`${this.articlesUrl}/update`, article);
  }

  public uploadArticleImage(articleImage: FormData): Observable<number> {
    return this.http.post<number>(`${this.articlesUrl}/articleImageUpload`, articleImage);
  }

  public updateArticleImage(articleImage: FormData): Observable<number> {
    return this.http.put<number>(`${this.articlesUrl}/articleImageUpload`, articleImage);
  }
}
