import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();
  constructor() { }
  sendMessage(message: string, bgmessage: string) {
    this.subject.next({ text: message, bgmgs: bgmessage });
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  clear() {
    this.subject.next();
  }
}
