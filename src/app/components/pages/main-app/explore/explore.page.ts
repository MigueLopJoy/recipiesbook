import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { addIcons } from "ionicons";
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [IonContent, HeaderComponent],
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage  implements OnInit {

  constructor() { }

  title: string = 'Explore Recipies';

  ngOnInit() {}

}
