import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from '../../../shared/header/header.component';
import { addIcons } from "ionicons";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonContent, HeaderComponent],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  implements OnInit {

  constructor() { }

  title: string = 'Profile';

  ngOnInit() {}

}
