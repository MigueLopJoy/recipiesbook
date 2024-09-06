import { Injectable } from '@angular/core';
import { Recipe } from '../../model/recipes/recipe';
import { Firestore, where } from '@angular/fire/firestore';
import { 
  addDoc, 
  collection, 
  DocumentReference, 
  DocumentSnapshot, 
  getDocs, 
  query, 
  startAfter, 
  limit, 
  QuerySnapshot,
} from 'firebase/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipiesService {

  constructor(
    private firestore: Firestore 
  ) { }

  private readonly recipiesRef = collection(this.firestore, 'recipes');

  addRecipie(body: Recipe): Observable<DocumentReference> {
    return from(addDoc(this.recipiesRef, body));
  }

  getRecipies(perPage: number, startDoc?: DocumentSnapshot): Observable<QuerySnapshot> {
    return from(startDoc
      ? getDocs(query(this.recipiesRef, startAfter(startDoc), limit(perPage)))
      : getDocs(query(this.recipiesRef, limit(perPage))));
  }

  getUserRecipies(authorId: string): Observable<QuerySnapshot> {
    return from(getDocs(query(this.recipiesRef, where('authorId', '==', authorId))));
  }


}
