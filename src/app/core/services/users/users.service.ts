import { Injectable } from '@angular/core';
import { collection, DocumentReference, Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { addDoc } from 'firebase/firestore';
import { User } from '../../model/users/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore: Firestore
  ) { }

  private readonly usersRef = collection(this.firestore, 'recipies');

  addUser(body: User): Observable<DocumentReference> {
    return from(addDoc(this.usersRef, body));
  }

}
