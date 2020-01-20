import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      // use map() to retrieve recipes[] from Store
      map(recipeState => {
        return recipeState.recipes;
      }),
      // use switchMap() swap Observables and emit it
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          // return Observable with data in a recipes[]
          return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
        } else {
          // else return Observable with an empty recipes[]
          return of(recipes);
        }
      })
    );
    // use Actions to wait for recipes to be set, then take the recipes object
    // take() completes and unsubscribes to Observable
    // this resolver waits to dispatch until the recipes are set
  }
}
