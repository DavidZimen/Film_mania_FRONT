import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Privilege} from "../../dto/privilege";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  avatarImage: any = 'assets/stockAvatarImage.png';
  authorId: number | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe((appUser) => {
      this.avatarImage = 'data:image/png;base64,' + appUser?.user?.avatar.avatarData;
      this.authorId = appUser?.user?.id;
    });
  }

  logout(event: any): void {
    this.userService.logout();
    event.preventDefault();
  }

  canWriteOrUpdateArticle(): boolean {
    let privilegesString = localStorage.getItem('privileges');

    if (privilegesString === null) return false;

    let privileges = JSON.parse(privilegesString) as Privilege[];
    let privilege = privileges.find((privilege) => privilege.name === 'WRITE_PRIVILEGE');

    return privilege !== undefined;
  }
}
