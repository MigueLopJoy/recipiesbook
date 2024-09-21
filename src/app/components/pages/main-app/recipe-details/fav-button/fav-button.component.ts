import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { UsersService } from '../../../../../core/services/users/users.service';
import { FavoritesService } from '../../../../../core/services/favorites/favorites.service';

@Component({
  standalone: true,
  imports: [IonButton, IonIcon],
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss'],
})
export class FavButtonComponent  implements OnInit {

  constructor(
    private favoritesService: FavoritesService
  ) { 
    addIcons({ heart, heartOutline}); 
  }

  @Input() recipeId!: string; 
  isFavorite!: boolean;

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    console.log(this.isFavorite)
    if (this.isFavorite) this.favoritesService.setFavorite(this.recipeId);   
    else this.favoritesService.removeFavorite(this.recipeId);
  }

  setFavorite(): void {
    this.isFavorite = this.favoritesService.isFavorite(this.recipeId);
  }

  ngOnInit() {
    this.setFavorite();
  }

}
