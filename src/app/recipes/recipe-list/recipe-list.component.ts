import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';


import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
// import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [
    trigger('listAnimations', [
      state('in', style({
        opacity: '1', backgroundColor: 'aliceblue'
      })),
      // transition('void => *', [
      //   style({ opacity: 0 }),
      //   animate(5000)
      // ]),
      transition('void => in', [
        animate(10000, style({ opacity: '0' }))
      ])
    ])
  ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  // recipes array list
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.subscription = this.recipeService.recipesChanged
    this.subscription = this.store.select('recipes') // select recipes from store
      .pipe(map(recipesState => recipesState.recipes)) // get the recipes[] object
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    // this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
