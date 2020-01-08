import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from './auth-response-data';
import { AlertComponent } from '../shared/alert/alert.component';
import { AnchorDirective } from '../shared/anchor/anchor.directive';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true; // only needed in this component, so not managed in NgRx store
  isLoading = false;
  error: string = null;
  authForm: FormGroup;
  private closeSubscription: Subscription;

  // @ViewChild points to the DOM element using the anchor directive
  @ViewChild(AnchorDirective, { static: false }) alertHost: AnchorDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.initForm();
    // get the auth state from the Store
    this.store.select('auth').subscribe(authState => {
      // here can get user, else an login error message
      // update UI based on Store State
      this.isLoading = authState.isLoading;
      this.error = authState.authError;
      // check if error occurred
      if (this.error) {
        this.showErrorAlert(this.error);
      }
      // note: use NgRx Effects for managing navigation
    });
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    // user data from auth form
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    // check login mode is signup or login, assign Observable
    if (this.isLoginMode) {
      // login to backend
      // authObservable = this.authService.login(email, password); // (deprecated) using Observables and Services

      // dispatch doesnt provide Observable
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    } else {
      // signup new user to backend
      authObservable = this.authService.signup(email, password);
    }

    // (deprecated) execute Observable by subscribing
    // authObservable.subscribe(response => {
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    // }, errorMessage => {
    //   this.error = 'ERROR: ' + errorMessage; // used with declarative example of dynamic components
    //   this.showErrorAlert(errorMessage);
    //   this.isLoading = false;
    // });

    this.authForm.reset();
  }

  // reset the error after
  // used with declarative example of dynamic components
  onHandleError() {
    this.error = null;
  }

  // used with imperative example of dynamic components
  private showErrorAlert(message: string) {
    // create a factory for specific component
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // clear elements in the DOM at container ref location
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory); // reference the created the component
    // use the component reference to get the instance and access its properties and functions
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  private initForm() {
    this.authForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
}
