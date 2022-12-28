import { Component, OnInit } from '@angular/core';
import {RegistrationRequestDto} from "../../dto/registration-request-dto";
import {NgForm} from "@angular/forms";
import {ToastService} from "../../services/toast.service";
import {LoginRegisterService} from "../../services/login-register.service";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationRequestDto: RegistrationRequestDto = new RegistrationRequestDto('', '', '', '', null, '');
  object = {"year": "", "month": "", "day": ""};

  constructor(
    private toastService: ToastService,
    private loginRegisterService: LoginRegisterService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(form: NgForm): void {
    if (form.invalid) {
      this.toastService.showErrorToast('Chyba registrácie', 'Registračný formulár nie je valídny.');
      return;
    }

    if (+this.object.day < 10) {
      this.registrationRequestDto.birth_date = `0${this.object.day}.${this.object.month}.${this.object.year}`;
    } else {
      this.registrationRequestDto.birth_date = `${this.object.day}.${this.object.month}.${this.object.year}`;
    }


    this.loginRegisterService.registerUser(this.registrationRequestDto).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.loginRegisterService.getRolesOfUser(user.id).subscribe((role) => {
          localStorage.setItem('role', JSON.stringify(role));
          this.loginRegisterService.getPrivilegesOfRoles(role.id).subscribe((privileges) => {
            localStorage.setItem('privileges', JSON.stringify(privileges));
            localStorage.setItem('stayLogged', JSON.stringify(false));
            this.userService.findLoggedInUser();
          })
        });

        this.toastService.showSuccessToast("Registrácia prebehla úspešne", "");
        this.router.navigate(['articles_list']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(this.registrationRequestDto);
        //if (err.status === 400) this.toastService.showErrorToast("Chyba registrácie", "Registračný formulár nie je valídny.");
      },
      complete: () => {}
    });
  }
}
