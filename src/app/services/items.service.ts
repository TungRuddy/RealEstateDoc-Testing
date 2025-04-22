import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { ITEM } from '../models/items.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private subject = new Subject<any>();

  constructor(private apiService: ApiService) {}

  query(queryList: any): Observable<any> {
    return this.apiService.get('/products', queryList?.filters);
  }
  get(id: string): Observable<any> {
    return this.apiService.get('/products/' + id, {});
  }
  save(item: ITEM): Observable<any> {
    // If we're updating an existing
    if (item.id) {
      return this.apiService.put('/products/' + item.id, item);
      // Otherwise, create a new
    } else {
      return this.apiService.post('/products', item);
    }
  }

  delete(item: ITEM): Observable<any> {
    return this.apiService.delete('/products/' + item?.id);
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
