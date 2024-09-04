import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from "ionicons";
import { IonRouterOutlet, IonContent } from "@ionic/angular/standalone";
import { ShareTitlesService } from '../../../core/services/share-data/share-titles/share-titles.service';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [IonContent, IonRouterOutlet, HeaderComponent],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.scss',
})
export class AuthPage  implements OnInit {

  constructor(
    private shareTitlesService: ShareTitlesService
  ){}

  title!: string;

  getTitle(): void {
    this.shareTitlesService.title.subscribe({
      next: (title: string) => {
        this.title = title;
      }
    })
  }

  ngOnInit() {
    this.getTitle();
  }



}
