import { Component } from '@angular/core';
import { IonTabButton, IonIcon, IonTabBar, IonTabs } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { search, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonIcon, IonTabButton ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor() {
    addIcons({search,personCircleOutline});
  }
}
