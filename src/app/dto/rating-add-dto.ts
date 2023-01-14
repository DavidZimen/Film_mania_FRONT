export class RatingAddDto {
  constructor(
    public rating: number,
    public userId: number | undefined,
    public filmId: number | undefined) {
  }
}
