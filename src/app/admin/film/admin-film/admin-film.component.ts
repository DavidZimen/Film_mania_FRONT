import { Component, OnInit } from '@angular/core';
import {FilmInTableDto} from "../../../dto/film-in-table-dto";
import {PermissionService} from "../../../services/permission.service";
import {FilmService} from "../../../services/film.service";
import {ToastService} from "../../../services/toast.service";
import {UserService} from "../../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-admin-film',
  templateUrl: './admin-film.component.html',
  styleUrls: ['./admin-film.component.css']
})
export class AdminFilmComponent implements OnInit {

  films: FilmInTableDto[] = [];
  userId: number | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private permissionService: PermissionService,
    private filmService: FilmService,
    private toastService: ToastService
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
    if (!this.permissionService.isAdmin(this.userId!)) {
      this.toastService.showErrorToast("Nemáte právo na prístup");
      this.router.navigate([""]);
      return;
    }

    this.loadFilms();
  }

  loadFilms(): void {
    this.filmService.getAllFilms(this.userId).subscribe({
      next: (films) => {
        this.films = films;
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showErrorToast("Chyba pri načítavaní filmov", "Skúste to znova prosím.");
      },
      complete: () => {}
    });
  }

  deleteFilm(filmId: number): void {
    this.filmService.deleteFilm(filmId).subscribe({
      next: (deleted) => {
        if (deleted) {
          this.toastService.showSuccessToast("Film úspešne vymazaný");
          this.loadFilms();
        }
      },
      error: err => {
        this.toastService.showErrorToast("Chyba pri mazaní filmu", "Skúste to neskôr prosím");
      },
      complete: () => {}
    });
  }

}
