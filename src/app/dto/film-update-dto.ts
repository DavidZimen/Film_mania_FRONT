import {FilmPartImage} from "../entities/film-part-image";

export class FilmUpdateDto {
  constructor(
    public id: number = 0,
    public title: string = "",
    public description: string = "",
    public year: number | undefined = undefined,
    public duration: number | undefined = undefined,
    public directorId: number | undefined = undefined,
    public actorIds: number[] = [],
    public genreIds: number[] = [],
    public image_id: FilmPartImage | undefined = undefined) {
  }
}
