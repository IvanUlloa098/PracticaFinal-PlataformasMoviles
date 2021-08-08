import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'meal-category',
    loadChildren: () => import('./pages/meal-category/meal-category.module').then( m => m.MealCategoryPageModule)
  },
  {
    path: 'display-meal',
    loadChildren: () => import('./pages/display-meal/display-meal.module').then( m => m.DisplayMealPageModule)
  },
  {
    path: 'search-ingredients',
    loadChildren: () => import('./pages/search-ingredients/search-ingredients.module').then( m => m.SearchIngredientsPageModule)
  },
  {
    path: 'inicio-app',
    loadChildren: () => import('./pages/inicio-app/inicio-app.module').then( m => m.InicioAppPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'display-ingredient',
    loadChildren: () => import('./pages/display-ingredient/display-ingredient.module').then( m => m.DisplayIngredientPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
