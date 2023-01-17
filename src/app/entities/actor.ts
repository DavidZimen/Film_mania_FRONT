import {FilmPartImage} from "./film-part-image";

export class Actor {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public actorImage: FilmPartImage | null) {
  }
}
