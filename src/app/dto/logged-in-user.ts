import {AppUserAvatar} from "../entities/app-user-avatar";

export class LoggedInUser {
  constructor(
    public id: number,
    public fisrtName: string,
    public lastName: string,
    public birth_date: Date | null,
    public email: string,
    public avatar: AppUserAvatar) {
  }
}
