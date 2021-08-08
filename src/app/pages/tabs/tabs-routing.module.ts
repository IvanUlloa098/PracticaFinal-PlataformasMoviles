import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-app'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'search',
        loadChildren: () => import('./../../pages/search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'inicio-app',
        loadChildren: () => import('./../../pages/inicio-app/inicio-app.module').then( m => m.InicioAppPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./../../pages/search/search.module').then( m => m.SearchPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
