import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private authorId: number | undefined;

  constructor(private userService: UserService) {
    this.userService.loggedInUser$.subscribe(
      (res) => this.authorId = res?.user?.id
    );
  }

  isCorrectAuthor(authorId: number): boolean {
    return authorId === this.authorId;

  }
}
