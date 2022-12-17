import { Component, OnInit } from '@angular/core';
import {LoginAppUser} from "../../dto/login-app-user";
import {LoginRegisterService} from "../../services/login-register.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userDto: LoginAppUser = new LoginAppUser('', '');

  constructor(private loginRegisterService: LoginRegisterService,) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginRegisterService.loginUser(this.userDto).subscribe((result) => {
      if (result) {
        alert("Login succesfull");
      } else if (!result) {
        alert("Something went wrong.");
      }
    });
  }
}
