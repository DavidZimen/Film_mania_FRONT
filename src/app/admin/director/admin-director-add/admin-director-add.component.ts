import { Component, OnInit } from '@angular/core';
import {FilmPartImageService} from "../../../services/film-part-image.service";
import {ToastService} from "../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {DirectorAddDto} from "../../../dto/director-add-dto";
import {DirectorService} from "../../../services/director.service";

@Component({
  selector: 'app-admin-director-add',
  templateUrl: './admin-director-add.component.html',
  styleUrls: ['./admin-director-add.component.css']
})
export class AdminDirectorAddComponent implements OnInit {

  adminId!: number
  addedDirector!: DirectorAddDto;
  uploadedImage!: File;

  constructor(
    private directorService: DirectorService,
    private filmImageService: FilmPartImageService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('admin_id'));
    this.addedDirector = new DirectorAddDto();
  }

  onSubmit(form: NgForm): void {
    if (this.uploadedImage === undefined) {
      this.addDirector();
      return;
    }

    const image = new FormData();
    image.append('image', this.uploadedImage);

    this.filmImageService.uploadImage(image).subscribe({
      next: (imageId) => {
        this.addedDirector.image_id = imageId;
        this.addDirector();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showErrorToast("Chyba pri ukladaní obrázku režiséra");
      },
      complete: () => {}
    });
  }

  addDirector(): void {
    this.directorService.addDirector(this.addedDirector).subscribe(
      {
        next: (data) => {
          this.addedDirector = new DirectorAddDto();
          this.toastService.showSuccessToast("Režisér úspešne pridaný do databázy");
          setTimeout( () => { this.router.navigate(['admin_director', this.adminId]) }, 500)
        },
        error: () => {
          this.toastService.showErrorToast("Chyba pri ukladaní režiséra");
        },
        complete: () => {}
      });
  }

  onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

  goBack(): void {
    this.router.navigate(['admin_director', this.adminId])
  }

}
