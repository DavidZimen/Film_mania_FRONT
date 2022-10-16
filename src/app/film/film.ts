export class Film {
  filmTitle: String;
  filmLength: number;
  filmDirector: String;
  rating: number


  constructor(filmTitle: String, filmLength: number, filmDirector: String, rating: number) {
    this.filmTitle = filmTitle;
    this.filmLength = filmLength;
    this.filmDirector = filmDirector;
    this.rating = rating;
  }
}
