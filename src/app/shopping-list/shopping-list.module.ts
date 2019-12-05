import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { SharedModule } from '../shared/shared.module';

// lazy loaded Feature Module
// to lazy load, the top route must be referenced in the main app module route config
// must contain its own routes and use .forChild() syntax
@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent }
    ]),
    SharedModule
  ]
})
export class ShoppingListModule { }
