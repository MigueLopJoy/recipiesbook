import { Component } from '@angular/core';
import { CreateRecipieFormComponent } from './create-recipie-form/create-recipie-form.component';
import { RecipiesService } from '../../../../core/services/recipies/recipies.service';
import { Recipie, RecipieData } from '../../../../core/model/recipies/recipie';
import { HeaderComponent } from '../../../shared/header/header.component';
import { IonContent } from "@ionic/angular/standalone";
import { DocumentReference } from '@angular/fire/firestore';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-create-recipie',
  standalone: true,
  imports: [IonContent, CreateRecipieFormComponent, HeaderComponent],
  templateUrl: './create-recipie.component.html',
  styleUrl: './create-recipie.component.scss'
})
export class CreateRecipiePage {

  constructor(
    private recipiesService: RecipiesService,
    private authService: AuthService
  ){}

  title: string = 'Create Recipie';


  createRecipie(recipieData: RecipieData): void {
    this.authService.getUserId().subscribe({
      next: (uid: string | null) => {
        if (uid) {
          this.recipiesService.addRecipie(
            this.buildRecipie(recipieData, uid)
          ).subscribe({
            next: (res: DocumentReference) => {
              console.log(res)
            }
          })
        }
      }
    })
  }


  buildRecipie(recipieData: RecipieData, authorId: string): Recipie {
    return {
      title: recipieData.title,
      description: recipieData.description,
      category: recipieData.category,
      ingredients: recipieData.ingredients,
      steps: recipieData.steps,
      images: recipieData.images,
      authorId
    };
  }
}
