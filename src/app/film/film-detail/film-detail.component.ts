import {Component, Injectable, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FilmService} from "../../services/film.service";
import {ActorService} from "../../services/actor.service";
import {GenreService} from "../../services/genre.service";
import {DirectorService} from "../../services/director.service";
import {Director} from "../../entities/director";
import {Actor} from "../../entities/actor";
import {Genre} from "../../entities/genre";
import {FilmDetailDto} from "../../dto/film-detail-dto";
import {UserService} from "../../services/user.service";
import {FilmPartImage} from "../../entities/film-part-image";
import {FilmPartImageService} from "../../services/film-part-image.service";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
@Injectable()
export class FilmDetailComponent implements OnInit {

  filmId!: number;
  film!: FilmDetailDto;
  filmImage!: FilmPartImage;
  director!: Director;
  actors: Actor[] = [];
  genres: Genre[] = [];

  userId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService,
    private directorService: DirectorService,
    private userService: UserService,
    private filmImagService: FilmPartImageService
  ) {
    this.userService.loggedInUser$.subscribe((user) => {
      if (user === null) {
        this.userId = undefined;
      } else {
        this.userId = user.user?.id;
      }
    })
  }

  ngOnInit(): void {
    this.filmId = Number(this.route.snapshot.paramMap.get('film_id'));
    this.loadData();
  }

  loadData(): void {
    this.loadFilm();
    this.loadActors();
    this.loadDirector();
    this.loadGenres();
  }

  loadFilm(): void {
    this.filmService.getFilmById(this.filmId, this.userId).subscribe((film) => {
      this.film = film;
      this.filmImagService.getImageOfFilm(this.filmId).subscribe((image) => {
        this.filmImage = image;
        console.log(this.filmImage);
      });
    });
  }

  loadDirector(): void {
    this.directorService.getDirectorOfFilm(this.filmId).subscribe((director) => this.director = director);
  }

  loadGenres(): void {
    this.genreService.getGenresOfFilm(this.filmId).subscribe((genres) => this.genres = genres);
  }

  loadActors(): void {
    this.actorService.getActorsOfFilm(this.filmId).subscribe((actors) => this.actors = actors);
  }

}
