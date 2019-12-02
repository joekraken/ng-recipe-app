export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {}


  // to access user's token
  get token() {
    // check token is valid and not expired
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    // else, token is valid
    return this._token;
  }

}
