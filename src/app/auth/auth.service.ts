import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
// AuthService to access Firebase auth REST API
export class AuthService {
  // user object.  BehaviorSubject emits current value when subscribed to and must have initial value
  // userSubject = new BehaviorSubject<User>(null);
  private tokenTimer: any; // to store token expiration timer

  constructor(private http: HttpClient, private router: Router,
    // inject the store with the global app state interface type
    private store: Store<fromApp.AppState>) { }

  /* functions refactored into NgRx Effects in auth.effects.ts
  login(email: string, password: string) {}
  signup(email: string, password: string) {}
  private handleAuthentication(email: string, uid: string, token: string, expiresIn: number) {}
  private handleError(errorResponse: HttpErrorResponse) {}
  logout() {}
  autoLogin() {}

  */

  // timer, in milliseconds, to expire old user tokens
  // renamed from autoLogout()
  setLogoutTimer(expirationDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
      this.tokenTimer = null;
    }
  }
}
