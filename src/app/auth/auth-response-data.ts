// interface representing the Firebase response payload data
export interface AuthResponseData {
  idToken: string; // auth id token
  email: string; // new user email
  refreshToken: string; // refresh token for new user
  expiresIn: string; // seconds when id token expires
  localId: string; // new user uid
  registered?: string; // if email exists, returned only by the login POST request
}
