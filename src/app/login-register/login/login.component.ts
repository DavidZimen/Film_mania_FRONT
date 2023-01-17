import { Component, OnInit } from '@angular/core';
import {LoginAppUser} from "../../dto/login-app-user";
import {LoginRegisterService} from "../../services/login-register.service";
import {ToastService} from "../../services/toast.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import {RegisterComponent} from "../register/register.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userDto: LoginAppUser = new LoginAppUser('', '');
    stayLoggedIn: boolean = false;
    dialog!: Dialog;

    constructor(
      private loginRegisterService: LoginRegisterService,
      private userService: UserService,
      private toastService: ToastService,
      private router: Router
    ) { }

    ngOnInit(): void {
    }

    login(): void {
      this.loginRegisterService.loginUser(this.userDto).subscribe({
        next: (user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.loginRegisterService.getRolesOfUser(user.id).subscribe((role) => {
            localStorage.setItem('role', JSON.stringify(role));
            this.loginRegisterService.getPrivilegesOfRoles(role.id).subscribe((privileges) => {
              localStorage.setItem('privileges', JSON.stringify(privileges));
              localStorage.setItem('stayLogged', JSON.stringify(this.stayLoggedIn));
              this.userService.findLoggedInUser();
            })
          });

          this.toastService.showSuccessToast("Prihásenie prebehlo úspešne");
          this.router.navigate(['']);

        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) this.toastService.showErrorToast("Chyba prihlásenia", "Zadané heslo nie je správne");
          if (error.status === 404) this.toastService.showErrorToast("Chyba prihlásenia", "Zadaný používateľ neexistuje");
        },
        complete: () => {}
      });
    }

    openRegisterDialog(): void {
      $('#registerModal').appendTo("body").modal('show');
    }
}
