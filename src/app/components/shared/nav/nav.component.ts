import { Component } from '@angular/core';
import { IonTabButton, IonTabs, IonIcon, IonTabBar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { search, playCircle, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [IonTabBar, IonIcon, IonTabs, IonTabButton ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor() {
    addIcons({search, playCircle, personCircleOutline});
  }
}
