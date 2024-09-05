import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareRegisterDataService {

  constructor() { }

  private notificiationSource: Subject<void> = new Subject<void>();
  public registrationSuccess: Observable<void> = this.notificiationSource.asObservable();

  public notifyRegistrationSuccess(): void {
    this.notificiationSource.next();
  }
}
