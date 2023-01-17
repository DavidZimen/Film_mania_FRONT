import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {AppUser} from "./entities/app-user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'FilmMania';

  appUser: AppUser | null = null;

  constructor(private userService: UserService) {
    this.userService.loggedInUser$.subscribe((appUser) => {
      this.appUser = appUser;
    });
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    console.log('closing browser');
    if (localStorage.getItem('stayLogged') === 'false') this.userService.logout();
  }
}
