import { Component, OnInit } from '@angular/core';
import {ToastService} from "../../../services/toast.service";
import {PermissionService} from "../../../services/permission.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Director} from "../../../entities/director";
import {DirectorService} from "../../../services/director.service";

@Component({
  selector: 'app-admin-derictor',
  templateUrl: './admin-director.component.html',
  styleUrls: ['./admin-director.component.css']
})
export class AdminDirectorComponent implements OnInit {

  adminId!: number
  directorsAll: Director[] = [];
  directorsFirst: Director [] = [];
  directorsSecond: Director[] = [];
  directorsThird: Director[] = [];

  constructor(
    private directorService: DirectorService,
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
    this.loadDirectors();
  }

  loadDirectors(): void {
    this.directorService.getAllDirectors().subscribe({
      next: (directors) => {
        this.directorsAll = directors;
        this.directorsToSeparateFields();
      },
      error: err => {},
      complete: () => {}
    });
  }

  deleteDirector(id: number): void {
    this.directorService.deleteDirector(id).subscribe({
      next: (res) => {
        this.toastService.showSuccessToast("Režisér úspešne odstránený.");
        this.loadDirectors();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.toastService.showErrorToast("Chyba pri odstraňovaní režiséra", "Režisér nesmie byť súčasťou filmov.");
        } else {
          this.toastService.showErrorToast("Chyba pri odstraňovaní režisér", "Neočakávaná chyba.");
        }

      },
      complete: () => {}
    });
  }

  private directorsToSeparateFields(): void {
    this.directorsFirst = [];
    this.directorsSecond = [];
    this.directorsThird = [];

    this.directorsAll.forEach((actor, index) => {
      switch (index % 3) {
        case 0:
          this.directorsFirst.push(actor);
          break;
        case 1:
          this.directorsSecond.push(actor);
          break;
        case 2:
          this.directorsThird.push(actor);
          break;
      }
    });
  }

}
