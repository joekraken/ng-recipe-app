import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

// @Injectable so things can injected into this class
@Injectable()
export class RecipeEffects {
  private url = 'https://ng-recipe-book-f3fe0.firebaseio.com/recipes.json';

  // fetchRecipes waits for http request to get recipes from server
  @Effect()
  fetchRecipes = this.actions$.pipe(
    // ofType() filters type of action to execute for
    ofType(RecipeActions.FETCH_RECIPES),
    // switchMap() swap Observables and get recipe data from server
    switchMap(() => {
      return this.http.get<Recipe[]>(this.url);
    }),
    // map() convert recipes JSON into recipes[] objects
    map(recipes => {
      if (recipes) {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      } else {
        return [];
      }
    }),
    // map() return new action to set the recipes data in the store
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  // storeRecipes Effect makes http request to save recipe and waits for response
  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    // ofType() filters the Actions to react to
    ofType(RecipeActions.STORE_RECIPES),
    // withLatestFrom() returns the data from the store as an array [actionData, storeData]
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(this.url, recipesState.recipes);
    })
  );

  // inject the Actions class from NgRx/effects
  constructor(private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) { }
}
