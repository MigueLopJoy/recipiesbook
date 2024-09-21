import { Injectable } from '@angular/core';
import { collection, doc, DocumentReference, Firestore, getDoc } from '@angular/fire/firestore';
import { first, from, map, Observable, of, switchMap } from 'rxjs';
import { addDoc, CollectionReference, DocumentData, DocumentSnapshot, getDocs, query, QueryDocumentSnapshot, QuerySnapshot, where } from 'firebase/firestore';
import { User, UserData } from '../../model/users/user';
import { User as AuthUser } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  private user!: User;
  private readonly usersRef: CollectionReference = collection(this.firestore, 'users');

  public getUser(): User {
    return this.user;
  }

  public getUserRef(): CollectionReference {
    return this.usersRef;
  }

  public setUser(): Observable<void> {
    return this.getUserByAuth().pipe(
      map((user: User | null) => {
        if (user) this.user = user;
      })
    )
  }

  public addUser(body: UserData): Observable<DocumentReference> {
    return from(addDoc(this.usersRef, body));
  }

  public getUserById(id: string): Observable<User | null> {
    return from(this.getUserDataById(id).pipe(
      map((userData: DocumentSnapshot | null) => {
        if (!userData) return null;
        return this.mapUser(userData);
      })
    ));
  }

  private getUserByAuth(): Observable<User | null> {
    return this.authService.authenticate().pipe(
      switchMap((authUser: AuthUser | null) => {
        if (!authUser) return of(null);
        return this.getUserDataByUid(authUser.uid).pipe(
          map((userDoc: QueryDocumentSnapshot | null) => {
            if (!userDoc) return null;
            return this.mapUser(userDoc);
          })
        );
      })
    );
  }

  private getUserDataById(id: string): Observable<DocumentSnapshot | null> {
    return from(getDoc(doc(this.usersRef, id))).pipe(
      map((userRef: DocumentSnapshot | null)=> {
        if (!userRef) return null;
        return userRef;
      })
    );
  }

  private getUserDataByUid(uid: string): Observable<QueryDocumentSnapshot | null> {
    return from(getDocs(query(
      this.usersRef, where('uid', '==', uid)
    ))).pipe(
      map((userQuerySnap: QuerySnapshot) => {
        if (!userQuerySnap) return null;
        return userQuerySnap.docs[0];
      }),
      first()
    );
  }

  private mapUser(userDoc: QueryDocumentSnapshot | DocumentSnapshot): User | null {
    if (!userDoc) return null;

    const data: DocumentData | undefined = userDoc.data();

    if (!data) return null;

    return {
      id: userDoc.id,
      uid: data['uid'],
      firstname: data['firstname'],
      lastname: data['lastname'],
      userName: data['userName'],
      email: data['email'],
      favorites: data['favorites']
    };
  }
}
