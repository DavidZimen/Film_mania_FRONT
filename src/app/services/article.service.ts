import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../entities/article";
import {ArticleCreation} from "../dto/article-creation";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articlesUrl: string = "http://localhost:8080/articles"

  constructor(private http: HttpClient) { }

  public getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.articlesUrl}/all`);
  }

  public getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.articlesUrl}/${id}`)
  }

  public deleteArcticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.articlesUrl}/delete/${id}`);
  }

  public addArticle(articleCreation: ArticleCreation): Observable<Article> {
    return this.http.post<Article>(`${this.articlesUrl}/add`, articleCreation);
  }

  public updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.articlesUrl}/update`, article);
  }
}
