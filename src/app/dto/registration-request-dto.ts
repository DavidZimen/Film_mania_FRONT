export class RegistrationRequestDto {
  constructor(
    public fisrtName: string,
    public lastName: string,
    public password: string,
    public email: string,
    public birth_date: String | null,
    public role: string,
    public avatarId: number | null) {
  }
}
