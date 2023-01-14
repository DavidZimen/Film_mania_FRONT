import { Component, OnInit } from '@angular/core';
import {ActorUpdateDto} from "../../dto/actor-update-dto";
import {ActorService} from "../../services/actor.service";
import {FilmPartImageService} from "../../services/film-part-image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {NgForm} from "@angular/forms";
import {FilmPartImage} from "../../entities/film-part-image";

@Component({
  selector: 'app-admin-actor-update',
  templateUrl: './admin-actor-update.component.html',
  styleUrls: ['./admin-actor-update.component.css']
})
export class AdminActorUpdateComponent implements OnInit {

  adminId!: number;
  uploadedImage!: File;
  updatingActorId!: number;
  updatingActor: ActorUpdateDto;

  constructor(
    private actorService: ActorService,
    private filmImageService: FilmPartImageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.updatingActor = new ActorUpdateDto();
  }

  ngOnInit(): void {
    this.adminId = Number(this.route.snapshot.paramMap.get('admin_id'));
    this.updatingActorId = Number(this.route.snapshot.paramMap.get('actor_id'));
    this.actorService.getActorById(this.updatingActorId).toPromise().then((res) => {
      this.updatingActor.id = res?.id;
      this.updatingActor.name = res?.name;
      this.updatingActor.description = res?.description;
      this.updatingActor.image_id = res?.actorImage!;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {

      if (this.uploadedImage === undefined) {
        this.updateActor();
        return;
      }

      const image = new FormData();
      this.updatingActor!.image_id === null ? image.append('image', this.uploadedImage) : image.append(`${this.updatingActor!.image_id?.id}`, this.uploadedImage);

      this.filmImageService.updateImage(image).subscribe(
        {
          next: (data) => {
            this.updatingActor.image_id = new FilmPartImage(data, null);
            this.updateActor();

          },
          error: () => {
            this.toastService.showErrorToast("Došlo ku chybe pri aktualizovaní obrázka herca.");
          },
          complete: () => {}
        }
      )
    }
  }

  updateActor(): void {
    this.actorService.updateActor(this.updatingActor!).subscribe(
      {
        next: (data) => {
          this.toastService.showSuccessToast("Hercove informácie úspešne aktualizované.");
          setTimeout(() => this.router.navigate(['/admin_actor', this.adminId]), 500);
        },
        error: () => {
          this.toastService.showErrorToast("Chyba pri aktualizovaní hercových informácii.");
        },
        complete: () => {}
      });
  }

  public onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }
}
