import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';

// import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
// import { authReducer } from './auth/store/auth.reducer';

@NgModule({
  // - list of components, directives, and pipes used in this modul
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // required for global Http services
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer), // register a global reducer and thus access a global NgRx Store
    EffectsModule.forRoot([AuthEffects]), // register Effects classes
    SharedModule,
    CoreModule
    // AuthModule, // lazy loaded modules shouldn't be eagerly loaded
    // RecipesModule, // lazy loaded modules shouldn't be eagerly loaded
    // ShoppingListModule, // lazy loaded modules shouldn't be eagerly loaded
  ],
  // - root component to load 1st, which is the entry point of the app
  bootstrap: [AppComponent]
})
export class AppModule { }
