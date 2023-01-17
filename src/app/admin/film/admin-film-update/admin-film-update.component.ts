import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {FilmService} from "../../../services/film.service";
import {ActorService} from "../../../services/actor.service";
import {DirectorService} from "../../../services/director.service";
import {GenreService} from "../../../services/genre.service";
import {FilmPartImageService} from "../../../services/film-part-image.service";
import {ToastService} from "../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ListItem} from "ng-multiselect-dropdown/multiselect.model";
import {FilmDetailDto} from "../../../dto/film-detail-dto";
import {FilmUpdateDto} from "../../../dto/film-update-dto";
import {FilmPartImage} from "../../../entities/film-part-image";

@Component({
  selector: 'app-admin-film-update',
  templateUrl: './admin-film-update.component.html',
  styleUrls: ['./admin-film-update.component.css']
})
export class AdminFilmUpdateComponent implements OnInit, AfterViewInit {

  directorForm!: FormGroup;
  actorsForm!: FormGroup;
  genresForm!: FormGroup;

  adminId!: number
  actors: any[] = [];
  genres: any[] = [];
  directors: any[] = [];

  film!: FilmDetailDto;
  filmImage!: FilmPartImage;
  updatedFilm!: FilmUpdateDto;
  updatedFilmId!: number;
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

  alreadySelectedDirector: any = [];
  alreadySelectedActors: any[] = [];
  alreadySelectedGenres: any[] = [];

  constructor(
    private filmService: FilmService,
    private actorService: ActorService,
    private directorService: DirectorService,
    private genreService: GenreService,
    private filmImageService: FilmPartImageService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

  }

  async ngOnInit() {
    this.directorForm = this.fb.group({ director: new FormControl(this.alreadySelectedDirector)});
    this.actorsForm = this.fb.group({ actors: new FormControl(this.alreadySelectedActors)});
    this.genresForm = this.fb.group({ genres: new FormControl(this.alreadySelectedGenres)});

    this.adminId = Number(this.route.snapshot.paramMap.get('admin_id'));
    this.updatedFilmId = Number(this.route.snapshot.paramMap.get('film_id'));

    await this.filmService.getFilmById(this.updatedFilmId, undefined).toPromise().then(film =>{this.film = film!});
    await this.filmImageService.getImageOfFilm(this.updatedFilmId).toPromise().then(image => this.filmImage = image!);
    await this.genreService.getAllGenres().toPromise().then(genres => genres!.forEach(genre => this.genres.push({id: genre.id, name: genre.name})));
    await this.directorService.getAllDirectors().toPromise().then(directors => directors!.forEach(director => this.directors.push({id: director.id, name: director.name})));
    await this.actorService.getAllActors().toPromise().then(actors => actors!.forEach(actor => this.actors.push({id: actor.id, name: actor.name})));
    await this.mapFilmDetailToFilmUpdateDto();
  }

  ngAfterViewInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (this.uploadedImage === undefined) {
      this.updateFilm();
      return;
    }

    const image = new FormData();
    this.updatedFilm.image_id?.id === -1 ? image.append('image', this.uploadedImage) : image.append(`${this.updatedFilm!.image_id?.id}`, this.uploadedImage);

    console.log(image);

    this.filmImageService.updateImage(image).subscribe({
      next: (imageId) => {
        console.log(imageId);
        this.updatedFilm.image_id = new FilmPartImage(imageId, null);
        this.updateFilm();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showErrorToast("Chyba pri ukladaní obrázku filmu");
      },
      complete: () => {}
    });
  }

  updateFilm(): void {

    this.filmService.updateFilm(this.updatedFilm).subscribe(
      {
        next: (data) => {
          this.toastService.showSuccessToast("Film úspešne aktualizovaný");
          setTimeout( () => { this.router.navigate(['admin_film', this.adminId]) }, 500);
        },
        error: () => {
          this.toastService.showErrorToast("Chyba pri aktualizovaní informácii o filme");
        },
        complete: () => {}
      });
  }

  async mapFilmDetailToFilmUpdateDto() {
    this.updatedFilm = new FilmUpdateDto()
    this.updatedFilm.id = this.film.id;
    this.updatedFilm.title = this.film.title;
    this.updatedFilm.description = this.film.description;
    this.updatedFilm.year = this.film.year;
    this.updatedFilm.duration = this.film.duration;
    this.filmImage === null ? this.updatedFilm.image_id = new FilmPartImage(-1, null) : this.updatedFilm.image_id = this.filmImage;

    await this.directorService.getDirectorOfFilm(this.updatedFilmId).toPromise().then(director => {
      this.updatedFilm.directorId = director!.id;
      this.alreadySelectedDirector = { id: director!.id, name: director!.name };
      this.directorForm.patchValue({
        director: this.alreadySelectedDirector
      });
    });
    await this.genreService.getGenresOfFilm(this.updatedFilmId).toPromise().then(genres => {
      genres!.forEach(genre => {
        this.updatedFilm.genreIds.push(genre.id);
        this.alreadySelectedGenres.push({ id: genre.id, name: genre.name });
      });
      this.genresForm.patchValue({
        genres: this.alreadySelectedGenres
      });
    });
    await this.actorService.getActorsOfFilm(this.updatedFilmId).toPromise().then(actors => {
      actors!.forEach(actor => {
        this.updatedFilm.actorIds.push(actor.id);
        this.alreadySelectedActors.push({ id: actor.id, name: actor.name });
      });
      this.actorsForm.patchValue({
        actors: this.alreadySelectedActors
      });
    })

  }

  onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

  goBack(): void {
    this.router.navigate(['admin_film', this.adminId])
  }

  onItemSelectActor(item: ListItem): void {
    this.updatedFilm.actorIds.push(Number(item.id));
  }

  onItemDeselectActor(item: ListItem): void {
    this.updatedFilm.actorIds = this.updatedFilm.actorIds.filter(obj => { return obj !== Number(item.id) } );
  }

  onItemSelectGenre(item: ListItem): void {
    this.updatedFilm.genreIds.push(Number(item.id));
  }

  onItemDeselectGenre(item: ListItem): void {
    this.updatedFilm.genreIds = this.updatedFilm.genreIds.filter(obj => { return obj !== Number(item.id) } );
  }

  onItemSelectDirector(item: ListItem): void {
    this.updatedFilm.directorId = Number(item.id);
  }

  onItemDeselectDirector(item: ListItem): void {
    this.updatedFilm.directorId = -1;
  }

}
