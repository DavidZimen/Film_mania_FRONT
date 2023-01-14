import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RatingAddDto} from "../dto/rating-add-dto";
import {RatingUpdateDto} from "../dto/rating-update-dto";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private ratingUrl: string = "http://localhost:8080/rating";

  constructor(private http: HttpClient) { }

  public rateFilm(ratingAddDto: RatingAddDto): Observable<number> {
    return this.http.post<number>(`${this.ratingUrl}/add`, ratingAddDto);
  }

  public updateRating(ratingUpdateDto: RatingUpdateDto): Observable<number> {
    return this.http.put<number>(`${this.ratingUrl}/update`, ratingUpdateDto);
  }
}
