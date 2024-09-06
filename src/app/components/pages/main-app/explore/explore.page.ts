import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { IonContent, IonButton } from "@ionic/angular/standalone";
import { RecipiesListComponent } from './recipies-list/recipies-list.component';
import { StoredRecipe } from '../../../../core/model/recipes/recipe';
import { RecipiesService } from '../../../../core/services/recipies/recipies.service';
import { DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [IonButton, IonContent, HeaderComponent, RecipiesListComponent],
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage  implements OnInit {

  constructor(
    private recipiesService: RecipiesService
  ) { }

  title: string = 'Explorar Recetas';

  recipies!: StoredRecipe[];
  lastDocument!: DocumentSnapshot;

  async getRecipies(): Promise<void> {
    this.recipiesService.getRecipies(5).subscribe({
      next: (recipiesData: QuerySnapshot) => {
        this.recipies = this.createRecipiesArr(recipiesData);
      }
    })
  }

  async loadMore(): Promise<void> {
    this.recipiesService.getRecipies(5, this.lastDocument).subscribe({
      next: (recipiesData: QuerySnapshot) => {
        this.recipies.push(...this.createRecipiesArr(recipiesData));
      }
    })
  }

  createRecipiesArr(recipiesData: QuerySnapshot): StoredRecipe[] {
    let recipies: StoredRecipe[] = [];
    
    recipiesData.forEach((recipieDoc: QueryDocumentSnapshot) => {
      this.lastDocument = recipieDoc;
      let recipie: StoredRecipe = this.convertToStoredRecipies(recipieDoc);
      recipies.push(recipie);
    });

    return recipies;
  }
  
  convertToStoredRecipies(recipieDoc: QueryDocumentSnapshot): StoredRecipe {
      const recipieData = recipieDoc.data();
      return {
        id: recipieDoc.id,
        title: recipieData['title'],
        description: recipieData['description'],
        category: recipieData['category'],
        ingredients: recipieData['ingredients'],
        steps: recipieData['steps'],
        images: recipieData['images'],
        authorId: recipieData['authorId']
      }
  }

  ngOnInit() {
    this.getRecipies();
  }

}
