import { Component, OnInit } from '@angular/core';
import { IonHeader, IonLabel, IonIcon, IonItem, IonListHeader, IonList, IonContent, IonImg, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonAvatar, IonChip, IonText, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonAlert } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { leafOutline, checkmarkCircleOutline, trashOutline, createOutline } from "ionicons/icons";
import { StoredRecipe } from '../../../../core/model/recipes/recipe';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ShareRecipesService } from '../../../../core/services/share-data/share-recipes/share-recipes.service';
import { User } from '../../../../core/model/users/user';
import { User as AuthUser } from '@angular/fire/auth'
import { UsersService } from '../../../../core/services/users/users.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RecipesService } from '../../../../core/services/recipes/recipes.service';
import { FavButtonComponent } from './fav-button/fav-button.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [IonAlert, IonButton, IonTitle, HeaderComponent, IonBackButton, IonButtons, IonToolbar, IonText, IonChip, IonAvatar, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonImg, IonContent, IonList, IonListHeader, IonItem, IonIcon, FavButtonComponent, IonLabel, IonHeader, ],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {

  constructor(
    private shareRecipesService: ShareRecipesService,
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {
    addIcons({leafOutline, checkmarkCircleOutline, trashOutline, createOutline }); 
  }

  title: string = "Recipe Details"
  recipe!: StoredRecipe;
  author!: User;
  isUserRecipe!: boolean;
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => this.delete()
    },
  ];
  alertText: string = '¿Realmente desea eliminar esta receta?';

  getRecipeId(): Observable<string | null> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get('id');
      })
    );
  }

  loadRecipe() {
    this.getRecipeId().subscribe({
      next: (recipeId: string | null) => {
        if (recipeId) {
          const recipe: StoredRecipe | undefined = this.shareRecipesService.findById(recipeId);      
          if (recipe) {
            this.recipe = recipe;
            this.getAuthor();
          } else this.router.navigate(['/']); 
        } else this.router.navigate(['/']);
      }
    })
  }

  getAuthor(): void {
    this.userService.getUserById(this.recipe.authorId).subscribe({
      next: (author: User | null) => {
        if (author) this.author = author;
        this.checkIfUserRecipe();
      }
    })
  }

  checkIfUserRecipe(): void {
    this.authService.getAuthUser().subscribe({
      next: (user: AuthUser | null) => {  
        this.isUserRecipe = user ? user.uid === this.author.uid : false
      }
    })
  }

  edit() {
    this.router.navigate(['/edit-recipe', this.recipe.id])
  }

  delete() {
    this.recipesService.removeRecipe(this.recipe.id).subscribe({
      next: () => {
        this.shareRecipesService.removeRecipe(this.recipe.id);
        this.router.navigate(['/profile']);
      }
    })
  }

  ngOnInit() {
    this.loadRecipe();
  }
}
