import { Routes } from '@angular/router';
import { CoreComponent } from './layouts/core/core.component';

export const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'items',
        loadChildren: () =>
          import('./items/items.routing').then((m) => m.itemsRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
