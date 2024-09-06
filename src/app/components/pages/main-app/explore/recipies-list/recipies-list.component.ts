import { Component, Input, OnInit } from '@angular/core';
import { IonList, IonCard, IonCardTitle, IonCardContent, IonCardHeader } from "@ionic/angular/standalone";
import { StoredRecipe } from '../../../../../core/model/recipes/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipies-list',
  standalone: true,
  imports: [IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonList, ],
  templateUrl: './recipies-list.component.html',
  styleUrls: ['./recipies-list.component.scss'],
})
export class RecipiesListComponent  implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input() recipies!: StoredRecipe[];

  openRecipie(id: string) {
    this.router.navigate([`/recipie-details/${id}`]);
  }

  ngOnInit() {}

}
