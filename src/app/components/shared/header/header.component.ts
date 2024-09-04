import { Component, Input, OnInit } from '@angular/core';
import { IonToolbar, IonTitle } from "@ionic/angular/standalone";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonTitle, IonToolbar, ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  @Input() title!: string;

  ngOnInit() {}

}
