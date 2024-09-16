import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonTabBar, IonTabButton, IonIcon, IonCol, IonGrid, IonRow, IonItem, IonToolbar } from "@ionic/angular/standalone";
import { HeaderComponent } from '../../../shared/header/header.component';
import { addIcons } from "ionicons";
import { gridOutline, heartOutline } from "ionicons/icons";
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { StoredRecipe } from '../../../../core/model/recipes/recipe';
import { UtilsService } from '../../../../core/services/utils/utils.service';
import { Router } from '@angular/router';
import { ShareRecipesService } from '../../../../core/services/share-data/share-recipes/share-recipes.service';
import { User } from 'firebase/auth';
import { RecipesService } from '../../../../core/services/recipes/recipes.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonToolbar, IonItem, IonRow, IonGrid, IonCol, IonIcon, IonTabButton, IonTabBar, IonButton, IonContent, HeaderComponent],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(
    private authService: AuthService,
    private recipesService: RecipesService,
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
        this.authService.getAuthUser().subscribe({
          next: (user: User | null) => {
            if (user) {
              this.recipesService.getUserRecipes(user.uid).subscribe({
                next: (response: QuerySnapshot) => {
                  this.recipes = this.buildRecipesArr(response, user.uid);
                  this.chunkRecipesArr(this.recipes);
                  this.shareRecipesService.clearRecipes();
                  this.shareRecipesService.setRecipes(this.recipes);
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
  

  buildRecipesArr(response: QuerySnapshot, authorId: string): StoredRecipe[] {
    return response.docs.map((doc: QueryDocumentSnapshot) => {  
      const data: DocumentData = doc.data()
      return {
          id: doc.id,
          title: data['title'],
          description: data['description'],
          category: data['category'],
          ingredients: data['ingredients'],
          steps: data['steps'],
          images: data['images'],
          authorId
        }
    });
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
    this.router.navigate(['/recipe-details', recipe.id]);
  }

  ionViewWillEnter() {
    this.loadUserPosts();
  }

}
