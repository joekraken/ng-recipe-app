import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './service/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private slSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.slSub = this.shoppingListService.ingredientsChanged
      .subscribe((list: Ingredient[]) => {
        this.ingredients = list;
      });
  }

  onEditItem(index: number) {
    // emitting the shopping item currently being edited
    this.shoppingListService.ingredientEditing.next(index);
  }

  ngOnDestroy(): void {
    this.slSub.unsubscribe();
  }
}
