export class LoginManager {
  private _userId: number;
  private _userLoggedIn: boolean;
  constructor() {
    this._userId = 1;
    this._userLoggedIn = true;
  }

  get userId(): number {
    return this._userId;
  }

  get userLoggedIn(): boolean {
    return this._userLoggedIn;
  }
}
