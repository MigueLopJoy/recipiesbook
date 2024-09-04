import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from '../../shared/header/header.component';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [IonContent, IonRouterOutlet, HeaderComponent, NavComponent],
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
