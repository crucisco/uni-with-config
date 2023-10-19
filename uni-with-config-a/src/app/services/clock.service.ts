import { Injectable } from '@angular/core';
import { isBrowser } from 'browser-or-node';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  getTimeObservable(): Observable<Date> {
    var subject = new Subject<Date>();
    if (isBrowser) {
      setInterval(() => {
        subject.next(new Date());
      }, 1000);
    }
    else {
      subject.next(new Date());
    }

    return subject;
  }

}
