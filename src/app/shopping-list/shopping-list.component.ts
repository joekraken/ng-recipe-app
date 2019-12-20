import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './service/shopping-list.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsObs: Observable<{ingredients: Ingredient[]}>;
  private slSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    // inject the store with its type, type is what the reducer returns
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    // access the Ingredients[] in the store via the Observable returned by select('propertyName')
    this.ingredientsObs = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.slSub = this.shoppingListService.ingredientsChanged
    //   .subscribe((list: Ingredient[]) => {
    //     this.ingredients = list;
    //   });
  }

  onEditItem(index: number) {
    // emitting the shopping item currently being edited
    // this.shoppingListService.ingredientEditing.next(index);

    // from the store, dispatch the START_EDIT action and include the ingredient index as payload
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.slSub.unsubscribe();
  }
}
