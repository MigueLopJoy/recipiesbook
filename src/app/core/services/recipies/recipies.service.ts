import { Injectable } from '@angular/core';
import { Recipie, StoredRecipie } from '../../model/recipies/recipie';
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
  QueryDocumentSnapshot
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipiesService {

  constructor(
    private firestore: Firestore 
  ) { }

  private readonly recipiesRef = collection(this.firestore, 'recipies');

  addRecipie(body: Recipie): Promise<DocumentReference> {
    return addDoc(this.recipiesRef, body);
  }

  getRecipiesData(perPage: number, startDoc?: DocumentSnapshot): Promise<QuerySnapshot> {
    return startDoc
      ? getDocs(query(this.recipiesRef, startAfter(startDoc), limit(perPage)))
      : getDocs(query(this.recipiesRef, limit(perPage)));
  }

  getRecipies(perPage: number, startDoc?: DocumentSnapshot) {
    const recipies: StoredRecipie[] = [];

    this.getRecipiesData(perPage, startDoc)
      .then((recipiesData: QuerySnapshot) => {
        recipiesData.forEach((recipieDoc: QueryDocumentSnapshot) => {
          const recipieData = recipieDoc.data();
          recipies.push({
            id: recipieDoc.id,
            title: recipieData['title'],
            description: recipieData['description'],
            category: recipieData['category'],
            ingredients: recipieData['ingredients'],
            steps: recipieData['steps'],
            images: recipieData['images']
          });
        });
      })
      
    return recipies;
  }




}
