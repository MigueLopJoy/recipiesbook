import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonTabBar, IonTabButton, IonIcon, IonCol, IonGrid, IonRow, IonItem } from "@ionic/angular/standalone";
import { HeaderComponent } from '../../../shared/header/header.component';
import { addIcons } from "ionicons";
import { gridOutline, heartOutline } from "ionicons/icons";
import { RecipiesService } from '../../../../core/services/recipies/recipies.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { StoredRecipe } from '../../../../core/model/recipes/recipe';
import { UtilsService } from '../../../../core/services/utils/utils.service';
import { Router } from '@angular/router';
import { ShareRecipesService } from '../../../../core/services/share-data/share-recipes/share-recipes.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonItem, IonRow, IonGrid, IonCol, IonIcon, IonTabButton, IonTabBar, IonButton, IonContent, HeaderComponent],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  implements OnInit {

  constructor(
    private authService: AuthService,
    private recipiesService: RecipiesService,
    private utilsService: UtilsService,
    private router: Router,
    private shareRecipesService: ShareRecipesService
  ) {
   addIcons({gridOutline,heartOutline}); 
  }

  title: string = 'Perfil de Usuario';
  section: number = 1;
  recipes!: StoredRecipe[];
  chunkedRecipes!: StoredRecipe[][];

  loadUserPosts() {
    this.utilsService.loading().subscribe({
      next: (loading: HTMLIonLoadingElement) => {
        loading.present();
        this.authService.getUserId().subscribe({
          next: (uId: string | null) => {
            if (uId) {
              this.recipiesService.getUserRecipies(uId).subscribe({
                next: (response: QuerySnapshot) => {
                  this.handleResponse(response, uId);
                  this.chunkRecipesArr(this.recipes);
                }
              })
    
            }
          }
        });
        loading.dismiss();
      }
    })
  }

  loadLikedPosts() {

  }

  chunkRecipesArr(recipes: StoredRecipe[]): void {
    const result: StoredRecipe[][] = [];
    for (let i = 0; i < recipes.length; i += 3) {
      result.push(recipes.slice(i, i + 3));
    }
    this.chunkedRecipes = result;
  }
  

  handleResponse(response: QuerySnapshot, authorId: string): void {
    let recipes: StoredRecipe[] = [];
    response.docs.forEach((doc: QueryDocumentSnapshot) => {  
      const data: DocumentData = doc.data(),
        recipe: StoredRecipe = {
          id: doc.id,
          title: data['title'],
          description: data['description'],
          category: data['category'],
          ingredients: data['ingredients'],
          steps: data['steps'],
          images: data['images'],
          authorId
        }
      recipes.push(recipe);
    });
    this.recipes = recipes;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth']);
      }
    });
  }

  editProfile(): void {

  }

  viewDetails(recipe: StoredRecipe): void {
    this.shareRecipesService.emitRecipe(recipe);
    this.router.navigate(['/recipe-details']);
  }

  ngOnInit() {
    this.loadUserPosts();
  }

}
