import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

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
    StoreModule.forRoot({shoppingList: shoppingListReducer}), // load NgRx store and register a reducer function
    // AuthModule, // lazy loaded modules shouldn't be eagerly loaded
    // RecipesModule, // lazy loaded modules shouldn't be eagerly loaded
    // ShoppingListModule, // lazy loaded modules shouldn't be eagerly loaded
    SharedModule,
    CoreModule
  ],
  // - root component to load 1st, which is the entry point of the app
  bootstrap: [AppComponent]
})
export class AppModule { }
