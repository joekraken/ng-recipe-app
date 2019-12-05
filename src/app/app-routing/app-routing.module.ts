import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // redirect for full empty path
  {
    path: 'recipes',
    loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule)
  } // lazy loaded module
  // wildcard will cause error in child route modules
  // { path: '**', redirectTo: '/recipes' } // wildcard routes redirect to main page
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
