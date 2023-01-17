export class RatingUpdateDto {
  constructor(
    public id: number,
    public rating: number,
    public userId: number | undefined,
    public filmId: number | undefined) {
  }
}
