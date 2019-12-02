import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe.model';
// import { RecipeService } from './service/recipe.service';

// Recipe Service provided here is also accessible to children components
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
  // ,providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;

  constructor() { }

  ngOnInit() {
    // this.recipeService.selectedRecipe
    //   .subscribe(
    //     (recipe: Recipe) => {
    //       this.selectedRecipe = recipe;
    //     }
    //   );
  }
}
