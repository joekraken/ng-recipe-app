import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*
      .pipe() steps:
      - take(n): gets the 'n' first value from BehaviorSubject<User> and unsubscribes from it
      - exhaustMap(): executes(subscribing) the Http GET request and returns the Observable

      result: authService Subject is executed and closed, then replaced by Http GET Observable and returned
    */
    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap(user => {
        // if (!user) {
        //   return next.handle(req);
        // }

        // check if user exists, is this login/signup request
        const modifiedReq = !user ? req : req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
