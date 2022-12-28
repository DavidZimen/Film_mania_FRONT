import { Injectable } from '@angular/core';
import {LoggedInUser} from "../dto/logged-in-user";
import {AppUser} from "../entities/app-user";
import {Privilege} from "../dto/privilege";
import {Role} from "../dto/role";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUser = new BehaviorSubject<AppUser | null>(null);
  public loggedInUser$: Observable<AppUser | null> = this.loggedInUser.asObservable();

  constructor() {
    this.findLoggedInUser();
  }

  findLoggedInUser(): void {
    let user = localStorage.getItem('user');
    let role = localStorage.getItem('role');
    let privilege = localStorage.getItem('privileges');

    if (user !== null && role !== null && privilege !== null) {
      this.loggedInUser.next(new AppUser(
        JSON.parse(user) as LoggedInUser,
        JSON.parse(role) as Role,
        JSON.parse(privilege) as Privilege)
      );
    }
  }

  logout(): void {
    if (this.loggedInUser === null) return;

    this.loggedInUser.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('privileges');
    localStorage.setItem('stayLogged', JSON.stringify(false));
  }
}
