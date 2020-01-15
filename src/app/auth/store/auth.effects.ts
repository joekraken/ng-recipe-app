import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { FirebaseSettings } from '../auth.constants';
import * as AuthActions from './auth.actions';
import { AuthResponseData } from '../auth-response-data';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

// helper function to handle login or signup authentication
const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  // this returns the data which map() wraps in an Observable automatically
  return (new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate
  }));
};

// so things can be injectable into this class
@Injectable() // not in root
export class AuthEffects {
  private readonly signupUrl = FirebaseSettings.URL + 'signUp?key=' + FirebaseSettings.APIKEY;
  private readonly loginUrl = FirebaseSettings.URL + 'signInWithPassword?key=' + FirebaseSettings.APIKEY;

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    // switchMap creates a new Observable from a previous one
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        this.signupUrl,
        // request body payload w/ 'email', 'password', and 'returnSecureToken' as true
        { 'email': signupAction.payload.email, 'password': signupAction.payload.password, 'returnSecureToken': true }
      ).pipe(
        // tap() to set logout timer
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        // map() returns an Observable, by wrapping data in an Observable
        map(resData => {
          return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
        }),
        catchError(errorResponse => {
          return this.handleError(errorResponse);
        })
      );
    })
  );

  // [authLogin property] register action handler as an @Effect() so NgRx can handle/see it
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START), // filter the actions to continue using
    switchMap((authData: AuthActions.LoginStart) => {
      // POST request requires endpoint w/ APIKEY and body
      return this.http.post<AuthResponseData>(
        this.loginUrl,
        // request body payload w/ 'email', 'password', and 'returnSecureToken' as true
        { 'email': authData.payload.email, 'password': authData.payload.password, 'returnSecureToken': true }
      ).pipe(
        // tap() to set logout timer
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        // map() returns an Observable, by wrapping data in an Observable
        map(resData => {
          return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
        }),
        catchError(errorResponse => {
          return this.handleError(errorResponse);
        })
      );
    })
  );

  // [authRedirect property] action handler when to redirect when async login succeeds
  // this Effect wont dispatch an action and not return an Observable
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  // action handler for auto login feature, returns an Observable with user data or 'dummy'/empty user
  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      // get user info, as simple object, from persistent storage
      const userData: { email: string, id: string, _token: string, _tokenExpirationDate: string }
        = JSON.parse(localStorage.getItem('userData'));
      // check if user exists
      if (!userData) {
        // return dummy data
        return { type: 'NO_DATA' };
      }
      // create new User() object
      const userObject = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      // check if token is valid
      if (userObject.token) {
        // this.userSubject.next(userObject);  // behavior provided via Subject/Observable method
        // set the user logout timer
        const expirationMilliseconds = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationMilliseconds);

        // dispatch the user LOGIN action and include the user data
        return new AuthActions.AuthenticateSuccess({
          email: userObject.email, userId: userObject.id, token: userObject.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
        // this.autoLogout(expirationMilliseconds);
      }
      // return dummy data
      return { type: 'NO_DATA' };
    })
  );

  // action handler for user logout
  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer(); // remove logout timer
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);  // fixed a redirect bug
    })
  );

  // CTOR: inject the Actions Observable, like having a stream of dispatched actions
  constructor(private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }

  // helper function to handle errors
  private handleError(errorResponse: any) {
    let message = 'Unknown error occurred!';
    // check error has data
    if (!errorResponse.error || !errorResponse.error.error) {
      return of(new AuthActions.AuthenticateFail(message));
    }
    if (errorResponse.error.error.message) {
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
    // call of() from rxjs to return a non error Observable so app doesnt die or freeze
    return of(new AuthActions.AuthenticateFail(message));
  }
}
