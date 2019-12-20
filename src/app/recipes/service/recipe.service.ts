import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from 'src/app/shopping-list/service/shopping-list.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

// remove @Injectable to make it component and its child accessiable only
// include @Injectable to make it global from 'root'
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // selectedRecipe = new EventEmitter<Recipe>();
  // selectedRecipe = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  // recipes array list
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe('spaghetti',
  //     'pasta with sauce',
  //     'https://cdn.pixabay.com/photo/2016/08/19/09/24/spaghetti-1604836_960_720.jpg',
  //     [new Ingredient('spaghetti', 1), new Ingredient('pasta sauce', 1)]),
  //   new Recipe('pizza',
  //     'dough with cheese and sauce',
  //     'https://live.staticflickr.com/2139/2329552391_ecdccd342c_b.jpg',
  //     [new Ingredient('dough', 1), new Ingredient('pizza sauce', 1), new Ingredient('cheese', 5)]),
  //   new Recipe('esfiha kibe',
  //     'arancini, rissole, croquette, pakora, chicken nugget',
  //     'https://c.pxhere.com/photos/b6/a1/esfiha_kibe_tidbits_snacks_power_supply-1375826.jpg!d',
  //     [new Ingredient('chicken', 1), new Ingredient('pakora', 4)]),
  //   new Recipe('thai fried shrimp',
  //     'rice, thailand, shrimp, asian food',
  //     'https://c.pxhere.com/photos/08/fc/food_dish_rice_thailand_food_thailand_shrimp_fast_food_the_pork_fried_rice_made-1377212.jpg!d',
  //     [new Ingredient('shrimp', 12)])
  // ];

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  // override recipe list
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.emitRecipeList();
  }

  getRecipes() {
    // using slice() returns a new array
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.emitRecipeList();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.emitRecipeList();
  }

  deleteRecipeAt(index: number) {
    this.recipes.splice(index, 1);
    this.emitRecipeList();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    // dispatch the AddIngredients() and include the Ingredients[] array as payload
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  emitRecipeList() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
