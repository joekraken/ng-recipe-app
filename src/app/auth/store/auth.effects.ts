import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { FirebaseSettings } from '../auth.constants';
import * as AuthActions from './auth.actions';
import { AuthResponseData } from '../auth-response-data';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// so things can be injectable into this class
@Injectable() // not in root
export class AuthEffects {
  private readonly signupUrl = FirebaseSettings.URL + 'signUp?key=' + FirebaseSettings.APIKEY;
  private readonly loginUrl = FirebaseSettings.URL + 'signInWithPassword?key=' + FirebaseSettings.APIKEY;

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
        // map() returns an Observable, by wrapping data in an Observable
        map(resData => {
          const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn) * 1000);
          // this returns the data which map() wraps in an Observable automatically
          return (new AuthActions.Login({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate: expirationDate
          }));
        }),
        catchError(errorResponse => {
          let message = 'Unknown error occurred!';
          // check error has data
          if (!errorResponse.error || !errorResponse.error.error) {
            return of(new AuthActions.LoginFail(message));
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
          return of(new AuthActions.LoginFail(message));
        })
      );
    })
  );

  // [authSuccess property] action handler when to redirect when async login succeeds
  // this Effect wont dispatch an action and not return an Observable
  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  // inject the Actions Observable, like having a stream of dispatched actions
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
