import {LoggedInUser} from "../dto/logged-in-user";
import {Role} from "../dto/role";
import {Privilege} from "../dto/privilege";

export class AppUser {
  constructor(
    public user: LoggedInUser | null,
    public role: Role | null,
    public privilege: Privilege | null) {
  }
}
