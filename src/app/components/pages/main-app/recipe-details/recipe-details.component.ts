import { Component, OnInit } from '@angular/core';
import { IonHeader, IonLabel, IonIcon, IonItem, IonListHeader, IonList, IonContent, IonImg, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonAvatar, IonChip, IonText, IonToolbar, IonButtons, IonBackButton, IonTitle } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { leafOutline, checkmarkCircleOutline } from "ionicons/icons";
import { StoredRecipe } from '../../../../core/model/recipes/recipe';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ShareRecipesService } from '../../../../core/services/share-data/share-recipes/share-recipes.service';
import { User } from '../../../../core/model/users/user';
import { UsersService } from '../../../../core/services/users/users.service';
import { QuerySnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [IonTitle, HeaderComponent, IonBackButton, IonButtons, IonToolbar, IonText, IonChip, IonAvatar, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonImg, IonContent, IonList, IonListHeader, IonItem, IonIcon, IonLabel, IonHeader, ],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent  implements OnInit {

  constructor(
    private shareRecipesService: ShareRecipesService,
    private userService: UsersService
  ) {
    addIcons({leafOutline,checkmarkCircleOutline}); 
  }

  title: string = "Recipe Details"
  recipe!: StoredRecipe;
  author!: User;

  getRecipe(): void{
    this.shareRecipesService.recipe.subscribe({
      next: (recipe: StoredRecipe) => {
        console.log(recipe)
        this.recipe = recipe;
        console.log(recipe)
        this.getAuthor();
      }
    })
  }

  getAuthor(): void {
    this.userService.getUser(this.recipe.authorId).subscribe({
      next: (res: QuerySnapshot) => {
        console.log(res.docs[0].data())
        let doc = res.docs[0],
          data = doc.data();
        this.author = {
          uid: doc.id,
          firstname: data['firstname'],
          lastname: data['lastname'],
          userName: data['userName'],
          email: data['email']
        }
      }
    })
  }

  ngOnInit() {
    this.getRecipe();
  }
}
