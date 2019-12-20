import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

// DEPRECATED: using the NgRx Store to manage shopping cart data
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 8)
  ];

  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientEditing = new Subject<number>(); // for editing an item in shopping list

  constructor() { }

  /*
  getIngredients() {
    // using slice() returns a copy of an array
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    // add ingredient to list
    this.ingredients.push(ingredient);
    // emit the updated list
    this.emitIngredients();
  }

  addIngredients(ingredients: Ingredient[]) {
    // add ingredients to list, using ES6 spread operator to pass array as arguments
    this.ingredients.push(...ingredients);
    // emit the updated list
    this.emitIngredients();
  }

  updateIngredient(index: number, data: Ingredient) {
    this.ingredients[index] = data;
    this.emitIngredients();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.emitIngredients();
  }

  // emit the current list
  emitIngredients() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  */
}
