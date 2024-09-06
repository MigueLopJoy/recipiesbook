import { Injectable } from '@angular/core';
import { collection, DocumentReference, Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { addDoc, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';
import { User } from '../../model/users/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore: Firestore
  ) { }

  private readonly usersRef = collection(this.firestore, 'users');

  addUser(body: User): Observable<DocumentReference> {
    return from(addDoc(this.usersRef, body));
  }

  getUser(uid: string): Observable<QuerySnapshot> {
    return from(getDocs(query(this.usersRef, where('uid', '==', uid))));
  }

}
