import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  // - list of components, directives, and pipes used in this modul
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule
  ],
  // - root component to load 1st, which is the entry point of the app
  bootstrap: [AppComponent]
})
export class AppModule { }
