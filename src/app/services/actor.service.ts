import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Actor} from "../entities/actor";
import {ActorAddDto} from "../dto/actor-add-dto";
import {ActorUpdateDto} from "../dto/actor-update-dto";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private actorUrl: string = "http://localhost:8080/actor";

  constructor(private http: HttpClient) { }

  public getActorById(id: number): Observable<Actor> {
    return this.http.get<Actor>(`${this.actorUrl}/byId/${id}`);
  }

  public getAllActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${this.actorUrl}/all`);
  }

  public addActor(actorAddDto: ActorAddDto): Observable<Actor> {
    return this.http.post<Actor>(`${this.actorUrl}/add`, actorAddDto);
  }

  public getActorsOfFilm(filmId: number): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${this.actorUrl}/allOfFilm/${filmId}`);
  }

  public updateActor(updateActorDro: ActorUpdateDto): Observable<Actor> {
    return this.http.put<Actor>(`${this.actorUrl}/update`, updateActorDro);
  }

  public deleteActor(id: number) {
    return this.http.delete<void>(`${this.actorUrl}/delete/${id}`);
  }
}
