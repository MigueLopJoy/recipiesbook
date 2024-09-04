import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from '../../shared/header/header.component';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [IonContent, IonRouterOutlet, HeaderComponent, NavComponent],
  templateUrl: './main-app.page.html',
  styleUrls: ['./main-app.page.scss'],
})
export class MainAppPage  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
