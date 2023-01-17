import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Genre} from "../entities/genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genreUrl: string = "http://localhost:8080/genre";

  constructor(private http: HttpClient) { }

  public getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.genreUrl}/all`);
  }

  public getGenreById(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.genreUrl}/byId/${id}`);
  }

  public getGenreByName(name: string): Observable<Genre> {
    return this.http.get<Genre>(`${this.genreUrl}/byName/${name}`);
  }

  public getGenresOfFilm(filmId: number): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.genreUrl}/allOfFilm/${filmId}`);
  }

  public addGenre(name: string): Observable<Genre> {
    return this.http.post<Genre>(`${this.genreUrl}/add?genreName=${name}`, name);
  }

  public updateGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.genreUrl}/update`, genre);
  }

  public deleteGenre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.genreUrl}/delete/${id}`);
  }
}
