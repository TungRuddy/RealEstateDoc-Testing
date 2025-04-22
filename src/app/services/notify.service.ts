import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private subject = new Subject<any>();
  constructor() { }


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
