import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

// @Injectable so things can injected into this class
@Injectable()
export class RecipeEffects {
  private url = 'https://ng-recipe-book-f3fe0.firebaseio.com/recipes.json';

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

  // inject the Actions class from NgRx/effects
  constructor(private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) { }
}
