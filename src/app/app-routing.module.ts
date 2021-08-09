import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { GuardnopasarGuard } from './guards/guardnopasar.guard';
import { GuardpasarGuard } from './guards/guardpasar.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule), canActivate : [GuardnopasarGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule), canActivate : [GuardnopasarGuard]
  },
  {
    path: 'meal-category',
    loadChildren: () => import('./pages/meal-category/meal-category.module').then( m => m.MealCategoryPageModule), canActivate : [GuardnopasarGuard]
  },
  {
    path: 'display-meal',
    loadChildren: () => import('./pages/display-meal/display-meal.module').then( m => m.DisplayMealPageModule), canActivate : [GuardnopasarGuard]
  },
  {
    path: 'search-ingredients',
    loadChildren: () => import('./pages/search-ingredients/search-ingredients.module').then( m => m.SearchIngredientsPageModule), canActivate : [GuardnopasarGuard]
  },
  {
    path: 'usercreate',
    loadChildren: () => import('./pages/usercreate/usercreate.module').then( m => m.UsercreatePageModule), canActivate : [GuardpasarGuard]
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule), canActivate : [GuardpasarGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'myaccount',
    loadChildren: () => import('./pages/myaccount/myaccount.module').then( m => m.MyaccountPageModule), canActivate : [GuardnopasarGuard]
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
