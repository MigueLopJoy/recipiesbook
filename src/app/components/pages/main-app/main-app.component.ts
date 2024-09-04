import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [IonRouterOutlet, ],
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
