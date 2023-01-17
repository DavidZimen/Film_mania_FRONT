import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Privilege} from "../../dto/privilege";
import {Role} from "../../dto/role";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  avatarImage: any = 'assets/stockAvatarImage.png';
  userId: number | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe((appUser) => {
      this.userId = appUser?.user?.id;
      console.log(this.userId);
      this.avatarImage = 'data:image/png;base64,' + appUser?.user?.avatar.avatarData;
    });
  }

  logout(event: any): void {
    this.userService.logout();
  }

  hasAuthorPrivileges(): boolean {
    let privilegesString = localStorage.getItem('privileges');

    if (privilegesString === null) return false;

    let privileges = JSON.parse(privilegesString) as Privilege[];
    let privilege = privileges.find((privilege) => privilege.name === 'WRITE_PRIVILEGE');

    return privilege !== undefined;
  }

  hasAdminPrivileges(): boolean {
    let roleString = localStorage.getItem('role');

    if (roleString === null) return false;

    let role = JSON.parse(roleString) as Role;

    return role.name === "ROLE_ADMIN";
  }
}
