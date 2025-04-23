import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { ITEMCATEGORY } from '../models/itemcategories.model';

@Injectable({
  providedIn: 'root',
})
export class ItemcategoriesService {
  private subject = new Subject<any>();

  constructor(private apiService: ApiService) {}

  query(queryList: any): Observable<any> {
    return this.apiService.get('/categories', queryList?.filters);
  }
  get(id: string): Observable<any> {
    return this.apiService.get('/categories/' + id, {});
  }
  save(item: ITEMCATEGORY): Observable<any> {
    // If we're updating an existing
    if (item.id) {
      return this.apiService.put('/categories/' + item.id, item);
      // Otherwise, create a new
    } else {
      return this.apiService.post('/categories', item);
    }
  }

  delete(item: ITEMCATEGORY): Observable<any> {
    return this.apiService.delete('/categories/' + item?.id);
  }
  // pass data parent route <--> child route
  sendData(message: any) {
    this.subject.next(message);
  }

  clearData() {
    this.subject.next('');
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
