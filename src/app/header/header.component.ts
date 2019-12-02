import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true; // to collapsed the dropdown menu
  private userSubcription: Subscription;
  isUserAuthenticated = false;

  constructor(private dataService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    // setup subscription to get the user object when logged in
    this.userSubcription = this.authService.userSubject.subscribe(user => {
      this.isUserAuthenticated = !!user;  // like using a ternary?:; operator
    });
  }

  onSave() {
    this.dataService.storeRecipes();
  }

  onFetch() {
    this.dataService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }
}
