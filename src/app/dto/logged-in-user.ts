export class LoggedInUser {
  constructor(
    public id: number,
    public fisrtName: string,
    public lastName: string,
    public birth_date: Date | null,
    public email: string) {
  }
}
