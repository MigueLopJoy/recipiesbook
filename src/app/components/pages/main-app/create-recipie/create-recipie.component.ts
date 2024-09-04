import { Component } from '@angular/core';
import { CreateRecipieFormComponent } from './create-recipie-form/create-recipie-form.component';
import { RecipiesService } from '../../../../core/services/recipies/recipies.service';
import { Recipie } from '../../../../core/model/recipies/recipie';
import { addIcons } from "ionicons";

@Component({
  selector: 'app-create-recipie',
  standalone: true,
  imports: [CreateRecipieFormComponent],
  templateUrl: './create-recipie.component.html',
  styleUrl: './create-recipie.component.css'
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
