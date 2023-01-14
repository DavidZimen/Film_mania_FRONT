import { Component, OnInit } from '@angular/core';
import {FilmInTableDto} from "../../dto/film-in-table-dto";
import {FilmService} from "../../services/film.service";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: FilmInTableDto[] = [];
  userId: number | undefined;

  constructor(
    private filmService: FilmService,
    private userService: UserService,
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
    this.loadFilms();
  }

  loadFilms() {
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

}
