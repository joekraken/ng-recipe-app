import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
// example of Reactive Forms
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; // true if existing recipe, false if new recipe
        this.initForm();
      });
  }

  onSubmit() {
    const f = this.recipeForm;
    const recipe = new Recipe(f.value['title'], f.value['description'], f.value['imageurl'], f.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    // as of Angular 8 .clear() will delete all items in FormArray
    // (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let title, imageurl, description = '';
    const ingredients = new FormArray([]);
    if (this.editMode) {
      // const recipe = this.recipeService.getRecipeById(this.id);
      this.store.select('recipes').pipe(
        map(state => {
          return state.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      ).subscribe(recipe => {
        title = recipe.name;
        imageurl = recipe.imageUrl;
        description = recipe.description;
        if (recipe['ingredients']) {
          for (const ingredient of recipe.ingredients) {
            ingredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              // Validator.pattern() takes a regex between two '/'
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'imageurl': new FormControl(imageurl, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    });
  }
}
