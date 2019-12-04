import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  // - list of services to include using dependency injection
  // services does not include @Injectable({providedIn: 'root'})
  // then must be provide here for global access
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ]
})
export class CoreModule { }
