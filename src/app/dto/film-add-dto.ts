export class FilmAddDto {
  constructor(
    public title: string = "",
    public description: string = "",
    public year: number | undefined = undefined,
    public duration: number | undefined = undefined,
    public directorId: number | undefined = undefined,
    public actorIds: number[] = [],
    public genreIds: number[] = [],
    public image_id: number = -1) {
  }
}
