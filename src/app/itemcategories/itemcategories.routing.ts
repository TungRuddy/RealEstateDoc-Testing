import { Routes } from '@angular/router';

export const itemcategoriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./itemcategories.component').then((m) => m.ItemcategoriesComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./itemcategories-detail/itemcategories-detail.component').then(
            (m) => m.ItemcategoriesDetailComponent
          ),
      },
    ],
  },
];
