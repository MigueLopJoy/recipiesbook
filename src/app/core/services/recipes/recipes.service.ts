import { Injectable } from '@angular/core';
import { Recipe, RecipeData, StoredRecipe } from '../../model/recipes/recipe';
import { doc, Firestore, setDoc, updateDoc, where } from '@angular/fire/firestore';
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
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(
    private firestore: Firestore 
  ) { }
  
  private readonly recipesRef = collection(this.firestore, 'recipes');

  addRecipe(body: Recipe): Observable<DocumentReference> {
    return from(addDoc(this.recipesRef, body));
  }

  findById(id: string): Observable<DocumentSnapshot> {
    return from(getDoc(doc(this.recipesRef, id)));
  }

  getRecipes(perPage: number, startDoc?: DocumentSnapshot): Observable<QuerySnapshot> {
    return from(startDoc
      ? getDocs(query(this.recipesRef, startAfter(startDoc), limit(perPage)))
      : getDocs(query(this.recipesRef, limit(perPage))));
  }

  getUserRecipes(authorId: string): Observable<QuerySnapshot> {
    return from(getDocs(query(this.recipesRef, where('authorId', '==', authorId))));
  }

  updateRecipe(id: string, data: RecipeData): Observable<void> {
    const docRef = doc(this.recipesRef, id);

    return from(updateDoc(docRef, {
      title: data.title,
      description: data.description,
      category: data.category,
      ingredients: data.ingredients,
      steps: data.steps,
      images: data.images
    }));
  }
 
  removeRecipe(id: string): Observable<void> {
    return from(deleteDoc(doc(this.recipesRef, id)));
  }

}
