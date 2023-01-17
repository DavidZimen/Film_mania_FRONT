export class ActorAddDto {
  constructor(
    public name: String = "",
    public description: string = "",
    public image_id: number = -1
  ) {
  }
}
