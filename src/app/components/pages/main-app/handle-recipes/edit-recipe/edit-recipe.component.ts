import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeData, StoredRecipe } from '../../../../../core/model/recipes/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareRecipesService } from '../../../../../core/services/share-data/share-recipes/share-recipes.service';
import { IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from '../../../../shared/header/header.component';
import { RecipesFormComponent } from '../recipes-form/recipes-form.component';
import { RecipesService } from '../../../../../core/services/recipes/recipes.service';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [IonContent, HeaderComponent, RecipesFormComponent, RecipesFormComponent],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent  implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shareRecipesService: ShareRecipesService,
    private recipesService: RecipesService
  ) { }

  title: string = 'Editar Receta';
  recipe!: StoredRecipe;

  getRecipe(): void {
    const recipeId: string | null = this.route.snapshot.paramMap.get('id');

    if (recipeId) {
      const recipe: StoredRecipe | undefined = this.shareRecipesService.findById(recipeId);
      
      if (recipe) 
        this.recipe = recipe;
      else
        this.router.navigate([``]); 
    }
  }

  updateRecipe(updatedData: RecipeData) {
    this.recipesService.updateRecipe(this.recipe.id, updatedData).subscribe({
      next: () => {
        this.recipesService.findById(this.recipe.id).subscribe({
          next: (doc: DocumentSnapshot) => {
            let data: DocumentData | undefined = doc.data();
            if (data) {
              this.shareRecipesService.updateRecipe({
                id: doc.id,
                title: data['title'],
                description: data['description'],
                category: data['category'],
                ingredients: data['ingredients'],
                steps: data['steps'],
                images: data['images'],
                authorId: data['authorId']
              });
              this.router.navigate(['/recipe-details', doc.id]);
            }
          }
        });
      }
    });
  }

  ngOnInit() {
    this.getRecipe();
  }

}
