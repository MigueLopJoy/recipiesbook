import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonTabBar, IonTabButton, IonIcon, IonCol, IonGrid, IonRow, IonItem } from "@ionic/angular/standalone";
import { HeaderComponent } from '../../../shared/header/header.component';
import { addIcons } from "ionicons";
import { gridOutline, heartOutline } from "ionicons/icons";
import { RecipiesService } from '../../../../core/services/recipies/recipies.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { StoredRecipie } from '../../../../core/model/recipies/recipie';
import { UtilsService } from '../../../../core/services/utils/utils.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
   addIcons({gridOutline,heartOutline}); 
  }

  title: string = 'Perfil de Usuario';
  section: number = 1;
  recipies!: StoredRecipie[];
  images!: string[][];
  chunkedImages!: string[][][];

  loadUserPosts() {
    this.utilsService.loading().subscribe({
      next: (loading: HTMLIonLoadingElement) => {
        loading.present();
        this.authService.getUserId().subscribe({
          next: (uId: string | null) => {
            if (uId) {
              this.recipiesService.getUserRecipies(uId).subscribe({
                next: (response: QuerySnapshot) => {
                  this.recipies = this.formatResponse(response, uId);
                  this.images = this.getImagesArr(this.recipies);
                  this.chunkedImages = this.chunkImagesArr(this.images);
                  loading.dismiss();
                }
              })
    
            }
          }
        });
      }
    })
  }

  loadLikedPosts() {

  }

  getImagesArr(recipies: StoredRecipie[]): string[][] {
    let images = recipies.map((recipie: StoredRecipie) => {
      return recipie.images;
    })
    return images;
  }

  chunkImagesArr(images: string[][]): string[][][] {
    const result: string[][][] = [];
    for (let i = 0; i < images.length; i += 3) {
      result.push(images.slice(i, i + 3));
    }
    return result;
  }
  

  formatResponse(response: QuerySnapshot, authorId: string): StoredRecipie[] {
    return response.docs.map((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data['title'],
        description: data['description'],
        category: data['category'],
        ingredients: data['ingredients'],
        steps: data['steps'],
        images: data['images'],
        authorId
      };
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

  ngOnInit() {
    this.loadUserPosts();
  }

}
