import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // redirect for full empty path
  { // lazy loaded module
    path: 'recipes',
    loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule)
  },
  { // lazy loaded module
    path: 'shopping-list',
    loadChildren: () => import('../shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  { // lazy loaded module
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  }
  // wildcard will cause error in child route modules
  // { path: '**', redirectTo: '/recipes' } // wildcard routes redirect to main page
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
