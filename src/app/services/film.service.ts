import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilmInTableDto} from "../dto/film-in-table-dto";
import {FilmAddDto} from "../dto/film-add-dto";
import {Film} from "../entities/film";
import {FilmDetailDto} from "../dto/film-detail-dto";
import {FilmUpdateDto} from "../dto/film-update-dto";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmUrl: string = "http://localhost:8080/film";

  constructor(private http: HttpClient) { }

  public getFilmById(filmId: number, userId: number | undefined) {
    if (userId === undefined) {
      return this.http.get<FilmDetailDto>(`${this.filmUrl}/getById/${filmId}`);
    } else {
      return this.http.get<FilmDetailDto>(`${this.filmUrl}/getById/${filmId}/${userId}`);
    }

  }

  public getAllFilms(userId: number | undefined): Observable<FilmInTableDto[]> {
    if (userId === undefined) {
      return this.http.get<FilmInTableDto[]>(`${this.filmUrl}/getAllFilms`);
    } else {
      return this.http.get<FilmInTableDto[]>(`${this.filmUrl}/getAllFilms/${userId}`);
    }
  }

  public addFilm(filmAddDto: FilmAddDto): Observable<Film> {
    return this.http.post<Film>(`${this.filmUrl}/add`, filmAddDto);
  }

  public updateFilm(filmUpdateDto: FilmUpdateDto): Observable<Film> {
    return this.http.put<Film>(`${this.filmUrl}/update`, filmUpdateDto);
  }

  public deleteFilm(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.filmUrl}/delete/${id}`);
  }
}
