import {FilmPartImage} from "./film-part-image";

export class Director {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public directorImage: FilmPartImage | null) {
  }
}
