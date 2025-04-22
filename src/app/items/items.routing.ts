import { Routes } from '@angular/router';

export const itemsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./items.component').then((m) => m.ItemsComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./items-detail/items-detail.component').then(
            (m) => m.ItemsDetailComponent
          ),
      },
    ],
  },
];
