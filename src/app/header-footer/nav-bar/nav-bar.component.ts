import {Component, Input, OnInit} from '@angular/core';
import {AppUser} from "../../entities/app-user";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input()
  appUser!: AppUser | null;

  constructor() { }

  ngOnInit(): void {
  }
}
