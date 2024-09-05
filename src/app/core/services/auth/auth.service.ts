import { Injectable } from '@angular/core';
import { Auth, authState, User,  } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth
  ) { }

  authenticate(): Observable<User | null> {
    return authState(this.auth);
  }
}
