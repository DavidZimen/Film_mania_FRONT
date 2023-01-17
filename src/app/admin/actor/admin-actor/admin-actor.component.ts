import { Component, OnInit } from '@angular/core';
import {Actor} from "../../../entities/actor";
import {ActorService} from "../../../services/actor.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastService} from "../../../services/toast.service";
import {PermissionService} from "../../../services/permission.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-actor',
  templateUrl: './admin-actor.component.html',
  styleUrls: ['./admin-actor.component.css']
})
export class AdminActorComponent implements OnInit {

  adminId!: number
  actorsAll: Actor[] = [];
  actorsFirst: Actor [] = [];
  actorsSecond: Actor[] = [];
  actorThird: Actor[] = [];

  constructor(
    private actorService: ActorService,
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
    this.loadActors();
  }

  loadActors(): void {
    this.actorService.getAllActors().subscribe({
      next: (actors) => {
        this.actorsAll = actors;
        this.actorsToSeparateFields();
      },
      error: err => {},
      complete: () => {}
    });
  }

  deleteActor(id: number): void {
    this.actorService.deleteActor(id).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast("Herec úspešne odstránený.");
        this.loadActors();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.toastService.showErrorToast("Chyba pri odstraňovaní herca", "Herec nesmie byť súčasťou filmov.");
        } else {
          this.toastService.showErrorToast("Chyba pri odstraňovaní herca", "Neočakávaná chyba.");
        }

      },
      complete: () => {}
    });
  }

  private actorsToSeparateFields(): void {
    this.actorsFirst = [];
    this.actorsSecond = [];
    this.actorThird = [];

    this.actorsAll.forEach((actor, index) => {
      switch (index % 3) {
        case 0:
          this.actorsFirst.push(actor);
          break;
        case 1:
          this.actorsSecond.push(actor);
          break;
        case 2:
          this.actorThird.push(actor);
          break;
      }
    });
  }
}
