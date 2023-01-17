import {Component, OnInit} from '@angular/core';
import {ActorService} from "../../../services/actor.service";
import {FilmPartImageService} from "../../../services/film-part-image.service";
import {ToastService} from "../../../services/toast.service";
import {ActorAddDto} from "../../../dto/actor-add-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-admin-actor-add',
  templateUrl: './admin-actor-add.component.html',
  styleUrls: ['./admin-actor-add.component.css']
})
export class AdminActorAddComponent implements OnInit {

  adminId!: number
  addedActor!: ActorAddDto;
  uploadedImage!: File;

  constructor(
    private actorService: ActorService,
    private filmImageService: FilmPartImageService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('admin:id'));
    this.addedActor = new ActorAddDto();
  }

  onSubmit(form: NgForm): void {
    if (this.uploadedImage === undefined) {
      this.addActor();
      return;
    }

    const image = new FormData();
    image.append('image', this.uploadedImage);

    this.filmImageService.uploadImage(image).subscribe({
      next: (imageId) => {
        this.addedActor.image_id = imageId;
        this.addActor();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showErrorToast("Chyba pri ukladaní obrázku herca");
      },
      complete: () => {}
    });
  }

  addActor(): void {
    this.actorService.addActor(this.addedActor).subscribe(
      {
        next: (data) => {
          this.addedActor = new ActorAddDto();
          this.toastService.showSuccessToast("Herec úspešne pridaný do databázy");
          setTimeout( () => { this.router.navigate(['admin_actor', this.adminId]) }, 500)
        },
        error: () => {
          this.toastService.showErrorToast("Chyba pri ukladaní herca");
        },
        complete: () => {}
      });
  }

  onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

  goBack(): void {
    this.router.navigate(['admin_actor', this.adminId])
  }

}
