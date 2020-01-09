import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { FirebaseSettings } from './auth.constants';
import { AuthResponseData } from './auth-response-data';
import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
// AuthService to access Firebase auth REST API
export class AuthService {
  // setup Firebase URL and Web API KEY
  private readonly APIKEY = FirebaseSettings.APIKEY;
  private readonly firebaseUrl = FirebaseSettings.URL;
  private readonly signupUrl = this.firebaseUrl + 'signUp?key=' + this.APIKEY;
  private readonly loginUrl = this.firebaseUrl + 'signInWithPassword?key=' + this.APIKEY;

  // user object.  BehaviorSubject emits current value when subscribed to and must have initial value
  // userSubject = new BehaviorSubject<User>(null);
  private tokenTimer: any; // to store token expiration timer

  constructor(private http: HttpClient, private router: Router,
    // inject the store with the global app state interface type
    private store: Store<fromApp.AppState>) { }

  /* functions refactored into NgRx Effects in auth.effects.ts
  login(email: string, password: string) {}
  signup(email: string, password: string) {
  */

  autoLogin() {
    // get user info, as simple object, from persistent storage
    const userData: { email: string, id: string, _token: string, _tokenExpirationDate: string }
      = JSON.parse(localStorage.getItem('userData'));
    // check if user exists
    if (!userData) {
      return;
    }
    // create new User() object
    const userObject = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    // check if token is valid
    if (userObject.token) {
      // this.userSubject.next(userObject);  // behavior provided via Subject/Observable method

      // dispatch the user LOGIN action and include the user data
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          email: userObject.email, userId: userObject.id, token: userObject.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      );
      const expirationMilliseconds = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationMilliseconds);
    }
  }

  // logout current user, set to null
  logout() {
    // this.userSubject.next(null);  // behavior provided via Subject/Observable method

    // dispatch the user LOGOUT action, no payload required the reducer will reset user data
    this.store.dispatch(new AuthActions.Logout());
    // this.router.navigate(['/auth']);  // (DEPRECATED) done by NgRx Effects in auth.effect.ts

    // delete user info from persistent storage
    localStorage.removeItem('userData');

    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
  }

  // timer, in milliseconds, to expire old user tokens
  autoLogout(expirationDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // handle authentication for login and signup
  private handleAuthentication(email: string, uid: string, token: string, expiresIn: number) {
    /// create expiration date by adding expiresIn(seconds) to the current Date(milliseconds)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, uid, token, expirationDate);  // used in Subject/Observable method
    // this.userSubject.next(user); // behavior provided via Subject/Observable method

    // dispatch the user LOGIN action and include the user data
    this.store.dispatch(
      new AuthActions.AuthenticateSuccess({
        email: email, userId: uid, token: token,
        expirationDate: expirationDate
      })
    );
    this.autoLogout(expiresIn * 1000);
    // persist the user data
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // handle all errors for login and signup Http POST requests from Firebase
  private handleError(errorResponse: HttpErrorResponse) {
    let message = 'Unknown error occurred!';
    // check error has data
    // if (!errorResponse.error || !errorResponse.error.error) {
    //   return throwError(message);
    // }
    if (errorResponse.error.error.message) {
      console.log('TCL: AuthService -> handleError -> errorResponse.error.error.message', errorResponse.error.error.message);
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          message = 'this email already exists!';
          break;
        case 'OPERATION_NOT_ALLOWED':
          message = 'sign in not allowed!';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          message = 'Too attempts, try again later!';
          break;
        case 'EMAIL_NOT_FOUND':
          message = 'this email doesnt exist!';
          break;
        case 'INVALID_PASSWORD':
          message = 'the password is incorrect!';
          break;
        case 'USER_DISABLED':
          message = 'this user account is disabled!';
          break;
        default:
          break;
      }
    }
    return throwError(message);
  }
}
