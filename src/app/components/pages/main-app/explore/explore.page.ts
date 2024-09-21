import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { IonContent, IonButton } from "@ionic/angular/standalone";
import { StoredRecipe } from '../../../../core/model/recipes/recipe';
import { DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { RecipesService } from '../../../../core/services/recipes/recipes.service';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ShareRecipesService } from '../../../../core/services/share-data/share-recipes/share-recipes.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [IonButton, IonContent, HeaderComponent, RecipesListComponent],
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage  implements OnInit {

  constructor(
    private recipesService: RecipesService,
    private shareRecipesService: ShareRecipesService,
  ) { }

  title: string = 'Explorar Recetas';

  recipes!: StoredRecipe[];
  lastDocument!: DocumentSnapshot;

  getRecipes(): void {
    this.recipesService.getRecipes(5).subscribe({
      next: (recipesData: QuerySnapshot) => {
        this.recipes = this.createRecipesArr(recipesData);
        this.shareRecipesService.clearRecipes();
        this.shareRecipesService.setRecipes(this.recipes);
      }
    })
  }

  loadMore(): void {
    this.recipesService.getRecipes(5, this.lastDocument).subscribe({
      next: (recipesData: QuerySnapshot) => {
        this.recipes.push(...this.createRecipesArr(recipesData));
        this.shareRecipesService.pushRecipes(this.recipes);
      }
    })
  }

  createRecipesArr(recipesData: QuerySnapshot): StoredRecipe[] {
    let recipes: StoredRecipe[] = [];
    
    recipesData.forEach((recipeDoc: QueryDocumentSnapshot) => {
      this.lastDocument = recipeDoc;
      let recipe: StoredRecipe = this.convertToStoredRecipes(recipeDoc);
      recipes.push(recipe);
    });

    return recipes;
  }
  
  convertToStoredRecipes(recipeDoc: QueryDocumentSnapshot): StoredRecipe {
      const recipeData = recipeDoc.data();
      return {
        id: recipeDoc.id,
        title: recipeData['title'],
        description: recipeData['description'],
        category: recipeData['category'],
        ingredients: recipeData['ingredients'],
        steps: recipeData['steps'],
        images: recipeData['images'],
        authorId: recipeData['authorId']
      }
  }

  ngOnInit() {
    this.getRecipes();
  }

}
