import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { LoginRequest } from '../../../model/auth/login/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth: Auth
  ) { }

  login(request: LoginRequest): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.auth,
      request.email,
      request.password
    ).then(() => {});
    return from(promise);
  }
}
