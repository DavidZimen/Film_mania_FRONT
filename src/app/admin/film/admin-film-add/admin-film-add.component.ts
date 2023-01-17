import { Component, OnInit } from '@angular/core';
import {FilmService} from "../../../services/film.service";
import {ActorService} from "../../../services/actor.service";
import {DirectorService} from "../../../services/director.service";
import {GenreService} from "../../../services/genre.service";
import {ToastService} from "../../../services/toast.service";
import {Actor} from "../../../entities/actor";
import {Director} from "../../../entities/director";
import {Genre} from "../../../entities/genre";
import {FilmAddDto} from "../../../dto/film-add-dto";
import {NgForm} from "@angular/forms";
import {FilmPartImageService} from "../../../services/film-part-image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ListItem} from "ng-multiselect-dropdown/multiselect.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-admin-film-add',
  templateUrl: './admin-film-add.component.html',
  styleUrls: ['./admin-film-add.component.css']
})
export class AdminFilmAddComponent implements OnInit {

  adminId!: number
  actors: Actor[] = [];
  genres: Genre[] = [];
  directors: Director[] = [];

  addedFilm: FilmAddDto = new FilmAddDto();
  uploadedImage!: File;

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 5,
    allowSearchFilter: true,
    enableCheckAll: false
  };

  dropdownSettingsDirector: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    allowSearchFilter: true
  };

  constructor(
    private filmService: FilmService,
    private actorService: ActorService,
    private directorService: DirectorService,
    private genreService: GenreService,
    private filmImageService: FilmPartImageService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('admin_id'));
    this.genreService.getAllGenres().subscribe(genres => this.genres = genres);
    this.directorService.getAllDirectors().subscribe(directors => this.directors = directors);
    this.actorService.getAllActors().subscribe(actors => this.actors = actors);
  }

  onSubmit(form: NgForm): void {
    if (this.uploadedImage === undefined) {
      this.addFilm();
      return;
    }

    const image = new FormData();
    image.append('image', this.uploadedImage);

    this.filmImageService.uploadImage(image).subscribe({
      next: (imageId) => {
        this.addedFilm.image_id = imageId;
        this.addFilm();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showErrorToast("Chyba pri ukladaní obrázku filmu");
      },
      complete: () => {}
    });
  }

  addFilm(): void {
    this.filmService.addFilm(this.addedFilm).subscribe(
      {
        next: (data) => {
          this.toastService.showSuccessToast("Film úspešne pridaný do databázy");
          setTimeout( () => { this.router.navigate(['admin_film', this.adminId]) }, 500);
        },
        error: () => {
          this.toastService.showErrorToast("Chyba pri ukladaní filmu");
        },
        complete: () => {}
      });
  }

  onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

  goBack(): void {
    this.router.navigate(['admin_film', this.adminId])
  }

  onItemSelectActor(item: ListItem): void {
    this.addedFilm.actorIds.push(Number(item.id));
  }

  onItemDeselectActor(item: ListItem): void {
    this.addedFilm.actorIds = this.addedFilm.actorIds.filter(obj => { return obj !== Number(item.id) } );
  }

  onItemSelectGenre(item: ListItem): void {
    this.addedFilm.genreIds.push(Number(item.id));
  }

  onItemDeselectGenre(item: ListItem): void {
    this.addedFilm.genreIds = this.addedFilm.genreIds.filter(obj => { return obj !== Number(item.id) } );
  }

  onItemSelectDirector(item: ListItem): void {
    this.addedFilm.directorId = Number(item.id);
  }

  onItemDeselectDirector(item: ListItem): void {
    this.addedFilm.directorId = -1;
  }

}
