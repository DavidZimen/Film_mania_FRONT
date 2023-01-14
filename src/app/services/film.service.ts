import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilmInTableDto} from "../dto/film-in-table-dto";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmUrl: string = "http://localhost:8080/film";

  constructor(private http: HttpClient) { }

  public getAllFilms(userId: number | undefined): Observable<FilmInTableDto[]> {
    if (userId === undefined) {
      return this.http.get<FilmInTableDto[]>(`${this.filmUrl}/getAllFilms`);
    } else {
      return this.http.get<FilmInTableDto[]>(`${this.filmUrl}/getAllFilms/${userId}`);
    }
  }
}
