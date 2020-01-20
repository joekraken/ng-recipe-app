import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './service/recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private dataService: DataStorageService,
    private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipeService.getRecipes();

    // if (recipes.length === 0) {
    //   return this.dataService.fetchRecipes();
    // } else {
    //   return recipes;
    // }

    this.store.dispatch(new RecipeActions.FetchRecipes());
    // use Actions to wait for recipes to be set, then take the recipes object
    // take() completes and unsubscribes to Observable
    // this resolver waits to dispatch until the recipes are set
    return this.actions$
      .pipe(
        ofType(RecipeActions.SET_RECIPES),
        take(1)
      );
  }
}
