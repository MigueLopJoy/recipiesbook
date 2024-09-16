import { Injectable } from '@angular/core';
import { StoredRecipe } from '../../../model/recipes/recipe';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareRecipesService {

  constructor() { }

  private recipes!: StoredRecipe[];

  setRecipes(recipes: StoredRecipe[]): void {
    this.recipes = recipes;
  }

  pushRecipes(recipes: StoredRecipe[]): void {
    this.recipes.push(...recipes);
  }

  clearRecipes(): void {
    this.recipes = [];
  }

  findById(id: string): StoredRecipe | undefined {
    return this.recipes.find((recipe: StoredRecipe) => recipe.id === id);
  }

  updateRecipe(recipe: StoredRecipe): void {
    const recipeIndex: number = this.recipes.findIndex((currRecipe: StoredRecipe) => currRecipe.id === recipe.id);    
    if (recipeIndex)
      this.recipes[recipeIndex] = recipe;
  }

  removeRecipe(id: string): void {
    console.log(this.recipes.findIndex((r: StoredRecipe) =>  {r.id === id}));
    this.recipes = this.recipes.filter((recipe: StoredRecipe) => recipe.id !== id);
    console.log(this.recipes.findIndex((r: StoredRecipe) =>  {r.id === id}));
  }

}
