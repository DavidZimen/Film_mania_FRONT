export class FilmDetailDto {
  constructor(
    public id: number,
    public title: string,
    public duration: number,
    public year: number,
    public description: string,
    public overallRating: number,
    public ratingId: number,
    public userRating: number
  ) {
  }
}
