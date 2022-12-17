import { Component, OnInit } from '@angular/core';
import {LoginAppUser} from "../../dto/login-app-user";
import {LoginRegisterService} from "../../services/login-register.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userDto: LoginAppUser = new LoginAppUser('', '');

    constructor(
      private loginRegisterService: LoginRegisterService,
      private route: ActivatedRoute,
      private router: Router
    ) { }

    ngOnInit(): void {
    }

    login(): void {
      this.loginRegisterService.loginUser(this.userDto).subscribe((result) => {
          if (result) {
            alert("Login succesfull");
            this.router.navigate(['/articles_list']);
          } else if (!result) {
            alert("Something went wrong.");
          }
      });
    }
}
