import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginAppUser} from "../dto/login-app-user";

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private loginUrl: string = "http://localhost:8080/login";

  constructor(private http: HttpClient) { }

  public loginUser(userDto: LoginAppUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.loginUrl}/loginUser`, userDto);
  }
}
