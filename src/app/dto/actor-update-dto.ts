import {FilmPartImage} from "../entities/film-part-image";

export class ActorUpdateDto {
  constructor(
    public id: number | undefined = -1,
    public name: String | undefined = "",
    public description: string | undefined = "",
    public image_id: FilmPartImage | undefined = undefined
  ) {
  }
}
