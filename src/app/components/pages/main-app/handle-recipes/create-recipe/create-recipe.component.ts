import { Component } from '@angular/core';
import { Recipe, RecipeData } from '../../../../../core/model/recipes/recipe';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { IonContent } from "@ionic/angular/standalone";
import { DocumentReference } from '@angular/fire/firestore';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { User } from 'firebase/auth';
import { RecipesService } from '../../../../../core/services/recipes/recipes.service';
import { RecipesFormComponent } from '../recipes-form/recipes-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipie',
  standalone: true,
  imports: [IonContent, RecipesFormComponent, HeaderComponent],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipePage {

  constructor(
    private recipesService: RecipesService,
    private authService: AuthService,
    private router: Router
  ){}

  title: string = 'Create Recipe';

  createRecipe(recipeData: RecipeData): void {
    this.authService.getAuthUser().subscribe({
      next: (user: User | null) => {
        if (user) {
          this.recipesService.addRecipe(
            this.buildRecipe(recipeData, user.uid)
          ).subscribe({
            next: (res: DocumentReference) => {
              this.router.navigate(['/recipe-details', res.id]);
            }
          })
        }
      }
    })
  }


  buildRecipe(recipeData: RecipeData, authorId: string): Recipe {
    return {
      title: recipeData.title,
      description: recipeData.description,
      category: recipeData.category,
      ingredients: recipeData.ingredients,
      steps: recipeData.steps,
      images: recipeData.images,
      authorId
    };
  }
}
