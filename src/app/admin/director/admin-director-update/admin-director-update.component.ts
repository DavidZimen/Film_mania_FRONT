import { Component, OnInit } from '@angular/core';
import {FilmPartImageService} from "../../../services/film-part-image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../services/toast.service";
import {NgForm} from "@angular/forms";
import {FilmPartImage} from "../../../entities/film-part-image";
import {DirectorUpdateDto} from "../../../dto/director-update-dto";
import {DirectorService} from "../../../services/director.service";

@Component({
  selector: 'app-admin-director-update',
  templateUrl: './admin-director-update.component.html',
  styleUrls: ['./admin-director-update.component.css']
})
export class AdminDirectorUpdateComponent implements OnInit {

  adminId!: number;
  uploadedImage!: File;
  updatingDirectorId!: number;
  updatingDirector: DirectorUpdateDto;

  constructor(
    private directorService: DirectorService,
    private filmImageService: FilmPartImageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.updatingDirector = new DirectorUpdateDto();
  }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('admin_id'));
    this.updatingDirectorId = Number(this.route.snapshot.paramMap.get('director_id'));
    this.directorService.getDirectorById(this.updatingDirectorId).toPromise().then((res) => {
      this.updatingDirector.id = res?.id;
      this.updatingDirector.name = res?.name;
      this.updatingDirector.description = res?.description;
      this.updatingDirector.image_id = res?.directorImage!;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {

      if (this.uploadedImage === undefined) {
        this.updateDirector();
        return;
      }

      const image = new FormData();
      this.updatingDirector!.image_id === null ? image.append('image', this.uploadedImage) : image.append(`${this.updatingDirector!.image_id?.id}`, this.uploadedImage);

      this.filmImageService.updateImage(image).subscribe(
        {
          next: (data) => {
            this.updatingDirector.image_id = new FilmPartImage(data, null);
            this.updateDirector();
          },
          error: () => {
            this.toastService.showErrorToast("Došlo ku chybe pri aktualizovaní obrázka režiséra.");
          },
          complete: () => {}
        }
      )
    }
  }

  updateDirector(): void {
    this.directorService.updateDirector(this.updatingDirector!).subscribe(
      {
        next: (data) => {
          this.toastService.showSuccessToast("Režisérové informácie úspešne aktualizované.");
          setTimeout(() => this.router.navigate(['/admin_actor', this.adminId]), 500);
        },
        error: () => {
          this.toastService.showErrorToast("Chyba pri aktualizovaní režisérových informácii.");
        },
        complete: () => {}
      });
  }

  public onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

}
