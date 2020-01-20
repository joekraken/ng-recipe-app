import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // use .pipe() on Observable returned by .params
    this.route.params
      .pipe(
        // map() to get the id from the url's params
        map(params => +params['id']),
        // swtichMap() to swap the .params Observable to the .store Observable
        // set the id and get the recipes[] from .store
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        // map() to get the recipe by index from the store
        map(state => {
          return state.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
    )
    // subscribe() to Observable and set the recipe
    .subscribe(recipe => {
      this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  // used in course demo code when edit recipe is clicked
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // example of navigating to a complex path
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipeAt(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']); // alternatively can use routerLink='recipes' in HTML
  }
}
