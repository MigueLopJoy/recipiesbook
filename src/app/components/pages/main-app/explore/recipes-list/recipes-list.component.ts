import { Component, Input, OnInit } from '@angular/core';
import { IonList, IonCard, IonCardTitle, IonCardContent, IonCardHeader } from "@ionic/angular/standalone";
import { StoredRecipe } from '../../../../../core/model/recipes/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonList, ],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent  implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input() recipes!: StoredRecipe[];

  openRecipie(id: string) {
    this.router.navigate([`/recipe-details/`, id]);
  }

  ngOnInit() {}

}
