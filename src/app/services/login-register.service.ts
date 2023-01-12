import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginAppUser} from "../dto/login-app-user";
import {LoggedInUser} from "../dto/logged-in-user";
import {Role} from "../dto/role";
import {Privilege} from "../dto/privilege";
import {RegistrationRequestDto} from "../dto/registration-request-dto";

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private loginUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public loginUser(userDto: LoginAppUser): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(`${this.loginUrl}/login/loginUser`, userDto);
  }

  public getRolesOfUser(userId: number): Observable<Role> {
    return this.http.get<Role>(`${this.loginUrl}/roles/role/${userId}`);
  }

  public getPrivilegesOfRoles(roleId: number): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(`${this.loginUrl}/privileges/privilege/${roleId}`);
  }

  public registerUser(registrationRequestDto: RegistrationRequestDto): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(`${this.loginUrl}/registration`, registrationRequestDto);
  }

  public uploadAvatarImage(avatarImage: FormData): Observable<number> {
    return this.http.post<number>(`${this.loginUrl}/registration/avatarUpload`, avatarImage);
  }
}
