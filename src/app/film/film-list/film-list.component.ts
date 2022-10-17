import { Component, OnInit } from '@angular/core';
import {Film} from "../film";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  recFilms: Film[] = [
    new Film('ForestGump', 2.28, '', 4.7),
    new Film('1917', 2.28, '', 4.8),
    new Film('Dark Age', 2.28, '', 3.7),
    new Film('Lord of the Rings', 2.28, '', 4.8),
    new Film('Shrek 1', 2.28, '', 4.5),
    new Film('Shrek 4', 2.28, '', 3.8),
    new Film('Dark knight', 2.28, '', 5),
    new Film('Iron man', 2.28, '', 4.8),
    new Film('The Avengers', 2.28, '', 4.9),
    new Film('Top Gun: Maverick', 2.28, '', 4.8),
    new Film('ForestGump', 2.28, '', 4.7),
    new Film('1917', 2.28, '', 4.8),
    new Film('Dark Age', 2.28, '', 3.7),
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
