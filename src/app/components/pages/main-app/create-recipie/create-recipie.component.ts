import { Component } from '@angular/core';
import { CreateRecipieFormComponent } from './create-recipie-form/create-recipie-form.component';
import { RecipiesService } from '../../../../core/services/recipies/recipies.service';
import { Recipie } from '../../../../core/model/recipies/recipie';
import { HeaderComponent } from '../../../shared/header/header.component';
import { addIcons } from "ionicons";
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-create-recipie',
  standalone: true,
  imports: [IonContent, CreateRecipieFormComponent, HeaderComponent],
  templateUrl: './create-recipie.component.html',
  styleUrl: './create-recipie.component.scss'
})
export class CreateRecipiePage {

  constructor(
    private recipiesService: RecipiesService
  ){}

  createRecipie(recipie: Recipie) {
    this.recipiesService.addRecipie(recipie)
      .then(response => console.log(response));
  }
}
