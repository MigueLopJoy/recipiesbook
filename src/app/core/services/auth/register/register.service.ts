import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, User, UserCredential } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { RegisterRequest } from '../../../model/auth/register/register-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private auth: Auth
  ) { }

  register(request: RegisterRequest): Observable<UserCredential> {
    const promise: Promise<UserCredential> = createUserWithEmailAndPassword(
      this.auth,
      request.email,
      request.password
    ).then((res: UserCredential) => res);
    return from(promise);
  }
}
