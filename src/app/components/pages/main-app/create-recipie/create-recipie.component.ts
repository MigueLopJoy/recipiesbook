import { Component } from '@angular/core';
import { CreateRecipieFormComponent } from './create-recipie-form/create-recipie-form.component';
import { RecipiesService } from '../../../../core/services/recipies/recipies.service';
import { Recipie } from '../../../../core/model/recipies/recipie';
import { HeaderComponent } from '../../../shared/header/header.component';
import { IonContent } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { DocumentReference } from '@angular/fire/firestore';

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

  title: string = 'Create Recipie';

  createRecipie(recipie: Recipie) {



    this.recipiesService.addRecipie(recipie).subscribe({
      next: (res: DocumentReference) => {
        console.log(res)
      }
    })
  }
}
