import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilmPartImageService {

  private filmImageUrl: string = "http://localhost:8080/filmPartImage";

  constructor(private http: HttpClient) { }

  public uploadImage(image: FormData): Observable<number> {
    return this.http.post<number>(`${this.filmImageUrl}/upload`, image);
  }

  public updateImage(image: FormData): Observable<number> {
    return this.http.put<number>(`${this.filmImageUrl}/update`, image);
  }
}
