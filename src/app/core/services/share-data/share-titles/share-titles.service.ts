import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareTitlesService {

  constructor() { }

  private titleSource: Subject<string> = new Subject<string>;
  public title: Observable<string> = this.titleSource.asObservable();

  public emitTitle(title: string) {
    this.titleSource.next(title);
  }
}
