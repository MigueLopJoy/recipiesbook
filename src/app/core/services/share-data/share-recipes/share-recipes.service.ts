import { Injectable } from '@angular/core';
import { StoredRecipe } from '../../../model/recipes/recipe';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareRecipesService {

  constructor() { }

  private recipeSource: ReplaySubject<StoredRecipe> = new ReplaySubject<StoredRecipe>(1);
  public recipe: Observable<StoredRecipe> = this.recipeSource.asObservable();

  public emitRecipe(recipe: StoredRecipe): void {
    this.recipeSource.next(recipe);
  }
}
