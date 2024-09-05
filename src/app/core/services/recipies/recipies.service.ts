import { Injectable } from '@angular/core';
import { Recipie } from '../../model/recipies/recipie';
import { Firestore } from '@angular/fire/firestore';
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

  private readonly recipiesRef = collection(this.firestore, 'recipies');

  addRecipie(body: Recipie): Observable<DocumentReference> {
    return from(addDoc(this.recipiesRef, body));
  }

  getRecipies(perPage: number, startDoc?: DocumentSnapshot): Observable<QuerySnapshot> {
    return from(startDoc
      ? getDocs(query(this.recipiesRef, startAfter(startDoc), limit(perPage)))
      : getDocs(query(this.recipiesRef, limit(perPage))));
  }




}
