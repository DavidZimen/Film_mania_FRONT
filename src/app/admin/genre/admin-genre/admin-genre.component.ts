import {Component, OnInit, ViewChild} from '@angular/core';
import {GenreService} from "../../../services/genre.service";
import {ToastService} from "../../../services/toast.service";
import {PermissionService} from "../../../services/permission.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Genre} from "../../../entities/genre";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-admin-genre',
  templateUrl: './admin-genre.component.html',
  styleUrls: ['./admin-genre.component.css']
})
export class AdminGenreComponent implements OnInit {

  adminId!: number;
  genres: Genre[] = [];
  newGenreName: string = "";
  updatingGenre!: Genre;
  @ViewChild('closeButton') closeButton: any;

  constructor(
    private genreService: GenreService,
    private toastService: ToastService,
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('admin_id'));
    if (!this.permissionService.isAdmin(this.adminId)) {
      this.router.navigate(['**']);
    }
    this.loadGenres();
  }

  loadGenres(): void {
      this.genreService.getAllGenres().subscribe((genres) => {
        this.genres = genres;
        console.log(this.genres)
      });
  }

  addGenre(form: NgForm): void {
    if (form.valid) {
      this.genreService.addGenre(this.newGenreName).subscribe({
        next: () => {
          this.closeButton.nativeElement.click();
          this.loadGenres();
          this.toastService.showSuccessToast("Žáner úspešne vytvorený");
        },
        error: err => {
          this.toastService.showErrorToast("Došlo ku chybe.", "Skúste to neskôr prosím");
        },
        complete: () => {}
      })
    }
  }

  deleteGenre(id: number): void {
    this.genreService.deleteGenre(id).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast("Žáner úspešne odstránený.");
        this.loadGenres();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.toastService.showErrorToast("Chyba pri odstraňovaní žánru", "Žáner nesmie byť priradený filmov.");
        } else {
          this.toastService.showErrorToast("Chyba pri odstraňovaní žánru", "Neočakávaná chyba.");
        }

      },
      complete: () => {}
    });
  }

  updateGenre(id: number): void {
    this.genreService.updateGenre(this.updatingGenre).subscribe({
      next: (data) => {
        this.closeButton.nativeElement.click();
        this.loadGenres();
        this.toastService.showSuccessToast("Názov žánru úspešne aktualizovaný.");
      },
      error: () => {
        this.toastService.showErrorToast("Chyba pri aktualizovaní žánru.");
      },
      complete: () => {}
    });
  }

  onUpdateClick(id: number, name: string): void {
    this.updatingGenre = new Genre(id, name);
  }
}
