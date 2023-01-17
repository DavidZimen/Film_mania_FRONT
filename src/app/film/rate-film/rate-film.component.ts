import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RatingService} from "../../services/rating.service";
import {ToastService} from "../../services/toast.service";
import {RatingAddDto} from "../../dto/rating-add-dto";
import {RatingUpdateDto} from "../../dto/rating-update-dto";

@Component({
  selector: 'app-rate-film',
  templateUrl: './rate-film.component.html',
  styleUrls: ['./rate-film.component.css']
})
export class RateFilmComponent implements OnInit {

  @Input() filmId: number | undefined;
  @Input() userId: number | undefined;
  @Input() userRating!: number;
  @Input() ratingId!: number;
  @Output() filmRated: EventEmitter<boolean> = new EventEmitter<boolean>();

  rating: number = 0;
  justLoaded: boolean = true;

  addRating!: RatingAddDto;
  updateRating!: RatingUpdateDto;

  constructor(
    private ratingService: RatingService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.addRating = new RatingAddDto(0, this.userId, this.filmId);
    this.updateRating = new RatingUpdateDto(this.ratingId, this.userRating, this.userId, this.filmId);
  }

  submitRating(): void {
    // if (this.justLoaded) {
    //   this.justLoaded = false;
    //   return;
    // }

    if (this.userId === undefined) {
      this.addRating.rating = 0;
      this.toastService.showInfoToast("Pre hodnotenie sa musíte prihlásiť");
      return;
    }

    this.addRating.rating = this.rating;

    this.ratingService.rateFilm(this.addRating).subscribe({
      next: (value) => {
        this.filmRated.next(true);
        this.toastService.showSuccessToast("Hodnotenie úspešne zaznamenané.");
      },
      error: (err) => {
        this.addRating.rating = 0;
        this.toastService.showErrorToast("Niečo sa pokazilo pri ukladaní hodnotenia", "Skúste to neskôr prosím.");
      },
      complete: () => {}
    });
  }

  submitUpdateRating(): void {
    if (this.userId === undefined) {
      this.updateRating.rating = 0;
      this.toastService.showInfoToast("Pre hodnotenie sa musíte prihlásiť");
      return;
    }

    this.ratingService.updateRating(this.updateRating).subscribe({
      next: (value) => {
        this.filmRated.next(true);
        this.toastService.showSuccessToast("Hodnotenie úspešne aktualizované.");
      },
      error: (err) => {
        this.updateRating.rating = 0;
        this.toastService.showErrorToast("Niečo sa pokazilo pri aktualizovaní hodnotenia", "Skúste to neskôr prosím.");
      },
      complete: () => {}
    });
  }
}
