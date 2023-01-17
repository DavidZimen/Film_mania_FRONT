import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Director} from "../entities/director";
import {DirectorUpdateDto} from "../dto/director-update-dto";
import {DirectorAddDto} from "../dto/director-add-dto";


@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private directorUrl: string = "http://localhost:8080/director";

  constructor(private http: HttpClient) { }

  public getDirectorById(id: number): Observable<Director> {
    return this.http.get<Director>(`${this.directorUrl}/byId/${id}`);
  }

  public getDirectorByName(name: string): Observable<Director> {
    return this.http.get<Director>(`${this.directorUrl}/byName/${name}`);
  }

  public getAllDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(`${this.directorUrl}/all`);
  }

  public getDirectorOfFilm(filmId: number): Observable<Director> {
    return this.http.get<Director>(`${this.directorUrl}/ofFilm/${filmId}`);
  }

  public addDirector(directorAddDto: DirectorAddDto): Observable<Director> {
    return this.http.post<Director>(`${this.directorUrl}/add`, directorAddDto);
  }

  public updateDirector(updateDirectorDto: DirectorUpdateDto): Observable<Director> {
    return this.http.put<Director>(`${this.directorUrl}/update`, updateDirectorDto);
  }

  public deleteDirector(id: number) {
    return this.http.delete<void>(`${this.directorUrl}/delete/${id}`);
  }
}
