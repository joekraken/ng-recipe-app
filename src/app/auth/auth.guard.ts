import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authService.userSubject.pipe(  // previous code using Subjects and Services
    return this.store.select('auth').pipe( // select the 'auth' property from the store
      take(1), // makes guard once
      // map(authState => {
      //   return authState.user;
      // }),
      // map(user => { // previous code using Subjects which provided a user object
      map(authState => { // the authState object contains the user object
        // return !!user;
        const isAuth = !!authState.user; // convert user object into a boolean type
        if (isAuth) {
          return true;
        }
        // auth is false, then return UrlTree and navigate to '/auth' page
        return this.router.createUrlTree(['/auth']);
      }),
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}
