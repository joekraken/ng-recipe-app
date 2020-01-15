import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/service/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private url = 'https://ng-recipe-book-f3fe0.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    if (recipes && recipes.length > 1) {
      // .put() will override existing data
      //  - must subscribe to http request to execute
      //  - 2 methods: .subscribe() here or return Observable then component .subscribe()
      this.http.put(this.url, recipes)
        .subscribe(res => {
          console.log('recipes sent to data server');
        });
    }
  }

  fetchRecipes() {
    /*
      .pipe() steps:
      - take(n): gets the 'n' first value from BehaviorSubject<User> and unsubscribes from it
      - exhaustMap(): executes(subscribing) the Http GET request and returns the Observable
      - map(): working on the data from GET Observable to include empty [] if ingredients dont exist
      - tap(): storing the Recipe[] data, from Http GET, to the Recipe Service

      result: authService Subject is executed and closed, then replaced by Http GET Observable and returned
    */
    // return this.authService.userSubject.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     return this.http.get<Recipe[]>(
    //       this.url,
    //       {
    //         params: new HttpParams().set('auth', user.token) // set query parameter for the user token
    //       }
    //     );
    //   }),
    //   map(recipes => {
    //     return recipes.map(recipe => {
    //       return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
    //     });
    //   }),
    //     tap(recipes => {
    //       console.log('recipes fetched');
    //       this.recipeService.setRecipes(recipes);
    //     })
    // );
    return this.http.get<Recipe[]>(this.url)
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
        tap(recipes => {
          // this.recipeService.setRecipes(recipes);
        })
      );
  }
}
