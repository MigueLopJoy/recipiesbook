import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { arrayUnion, deleteDoc, doc, DocumentReference, QuerySnapshot, updateDoc } from '@angular/fire/firestore';
import { User } from '../../model/users/user';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private userService: UsersService
  ) { }

  setFavorite(recipeId: string): void {
    const userId = this.userService.getUser().id;
    const userRef: DocumentReference = doc(this.userService.getUserRef(), userId);
    from(updateDoc(userRef, {
      favorites: arrayUnion(recipeId)
    })).subscribe({
      next: () => this.pushFavoriteIfNotExists(recipeId)
    });
  } 

  removeFavorite(recipeId: string): void {
    const userId = this.userService.getUser().id;
    const userRef: DocumentReference = doc(this.userService.getUserRef(), userId);
    from(deleteDoc(userRef)).subscribe({
      next: () => this.removeFavorteIfExists(recipeId)
    });
  }

  removeFavorteIfExists(recipeId: string): void {
    const favorites: string[] = this.userService.getUser().favorites;
    if (favorites.includes(recipeId)) favorites.splice(favorites.indexOf(recipeId), 1);
  }


  pushFavoriteIfNotExists(recipeId: string): void {
    const favorites: string[] = this.userService.getUser().favorites;
    if (!favorites.includes(recipeId)) favorites.push(recipeId);
  }
  
  isFavorite(recipeId: string): boolean {
    return this.userService.getUser().favorites.includes(recipeId);
  }
}
