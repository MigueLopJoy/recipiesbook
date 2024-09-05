import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User, UserCredential } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { LoginRequest } from '../../../model/auth/login/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth: Auth
  ) { }

  login(request: LoginRequest): Observable<UserCredential> {
    const promise: Promise<UserCredential> = signInWithEmailAndPassword(
      this.auth,
      request.email,
      request.password
    ).then((res: UserCredential) => res);
    return from(promise);
  }
}
