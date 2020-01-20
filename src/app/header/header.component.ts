import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true; // to collapsed the dropdown menu
  private userSubcription: Subscription;
  isUserAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // setup subscription to get the user object when logged in
    // this.userSubcription = this.authService.userSubject.subscribe(user => { // previous code using Subjects and Services
    this.userSubcription = this.store
      .select('auth')
      // .pipe(map(authState => authState.user)) // extract the user from the authState object
      .subscribe(authState => {
        this.isUserAuthenticated = !!authState.user;  // like using a ternary?:; operator
      });
  }

  onSave() {
    // this.dataService.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetch() {
    // this.dataService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }
}
