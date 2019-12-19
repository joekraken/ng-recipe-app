import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../service/shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
  // example of Template Forms
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  /* @ViewChild for accessing an element in HTML via local reference */
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  @ViewChild('f', {static: false}) shoppingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
    // inject the store with its type, type is what the reducer returns
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit() {
    // init the editing ingredient in the store
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      // check the index if there is an ingredient to edit
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.editedItemIndex = stateData.editedIngredientIndex; // redundant data
        // set the form values with edited ingredient
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });

    // replaced with the code above that uses the store
    // use shopping list service to get editing ingredient values
    // this.subscription = this.shoppingListService.ingredientEditing
    //   .subscribe((index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    //     this.shoppingForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   });
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);

      // dispatch UPDATE_INGREDIENT action and include payload with index and newIngredient
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ index: this.editedItemIndex, ingredient: newIngredient }));
    } else {
      // this.shoppingListService.addIngredient(newIngredient);

      // dispatch ADD_INGREDIENT action and include the new data payload
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    // this.editMode = false;
    // form.reset();
    this.onClear();
  }

  onDelete() {
    if (this.editMode) {
      // this.shoppingListService.deleteIngredient(this.editedItemIndex);

      // dispatch DELETE_INGREDIENT action and include the ingredient index as payload
      this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
      this.onClear();
    }
  }

  onClear() {
    this.editMode = false;
    this.shoppingForm.reset({ amount: 1 }); // optional: pass value to reset the control

    // from store, dispatch STOP_EDIT action to reset the editing ingredient to null and index -1
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    // if page is destroyed, i.e. navigated away, then reset editing ingredient
    // from store, dispatch STOP_EDIT action to reset the editing ingredient to null and index -1
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
