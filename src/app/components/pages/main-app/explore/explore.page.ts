import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { IonContent, IonButton } from "@ionic/angular/standalone";
import { RecipiesListComponent } from './recipies-list/recipies-list.component';
import { StoredRecipie } from '../../../../core/model/recipies/recipie';
import { RecipiesService } from '../../../../core/services/recipies/recipies.service';
import { addIcons } from "ionicons";
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

  recipies!: StoredRecipie[];
  lastDocument!: DocumentSnapshot;

  async getRecipies(): Promise<void> {
    let recipiesData: QuerySnapshot = await this.recipiesService.getRecipies(5);
    this.recipies = this.createRecipiesArr(recipiesData);
  }

  async loadMore(): Promise<void> {
    let recipiesData: QuerySnapshot = await this.recipiesService.getRecipies(5, this.lastDocument);
    this.recipies.push(...this.createRecipiesArr(recipiesData));
  }

  createRecipiesArr(recipiesData: QuerySnapshot): StoredRecipie[] {
    let recipies: StoredRecipie[] = [];
    
    recipiesData.forEach((recipieDoc: QueryDocumentSnapshot) => {
      this.lastDocument = recipieDoc;
      let recipie: StoredRecipie = this.convertToStoredRecipies(recipieDoc);
      recipies.push(recipie);
    });

    return recipies;
  }
  
  convertToStoredRecipies(recipieDoc: QueryDocumentSnapshot): StoredRecipie {
      const recipieData = recipieDoc.data();
      return {
        id: recipieDoc.id,
        title: recipieData['title'],
        description: recipieData['description'],
        category: recipieData['category'],
        ingredients: recipieData['ingredients'],
        steps: recipieData['steps'],
        images: recipieData['images'],
      }
  }

  ngOnInit() {
    this.getRecipies();
  }

}
