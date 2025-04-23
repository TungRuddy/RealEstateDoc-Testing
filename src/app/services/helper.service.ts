import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  removeIdFromRoute(id: string, router: Router, query?: any) {
    if (id) {
      const route = router.url.split('/');
      const i = route.findIndex((f) => f.includes(id));
      if (i !== -1 && i !== undefined && i !== null) {
        route.splice(i, 1);
        router.navigate([route.join('/')], {
          queryParams: query ? query.filters : {},
        });
      }
    }
  }
}
