export class FilmInTableDto {
  constructor(
    public id: number,
    public title: string,
    public duration: number,
    public year: number,
    public overallRating: number,
    public ratingId: number,
    public userRating: number
  ) {
  }
}
