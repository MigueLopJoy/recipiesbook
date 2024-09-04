import { Component, OnInit } from '@angular/core';
import { addIcons } from "ionicons";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
