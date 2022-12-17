import { Component, OnInit } from '@angular/core';
import {LoginAppUser} from "../../dto/login-app-user";
import {LoginRegisterService} from "../../services/login-register.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userDto: LoginAppUser = new LoginAppUser('', '');
    unauthorized: boolean = false;
    notFound: boolean = false;

    constructor(
      private loginRegisterService: LoginRegisterService,
      private route: ActivatedRoute,
      private router: Router,
      private toastService: ToastService
    ) { }

    ngOnInit(): void {
    }

    login(): void {
      this.unauthorized = false;
      this.notFound = false;

      console.log("tu som")

      this.loginRegisterService.loginUser(this.userDto).subscribe({
        next: (mail) => {
          //TODO mail to local storage
          console.log(mail);
          this.toastService.showSuccessToast("Prihlásenie", "Prihlásenie prebehlo úspešne.");
        },
        error: (error) => {
          console.error(error);
          this.toastService.showErrorToast("Prihlasenie", "Nieco sa pokazilo");
        },
        complete: () => {}
      });
    }
}
