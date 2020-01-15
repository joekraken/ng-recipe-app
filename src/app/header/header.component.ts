import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true; // to collapsed the dropdown menu
  private userSubcription: Subscription;
  isUserAuthenticated = false;

  constructor(private dataService: DataStorageService, private store: Store<fromApp.AppState>) { }

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
    this.dataService.storeRecipes();
  }

  onFetch() {
    this.dataService.fetchRecipes().subscribe();
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }
}
