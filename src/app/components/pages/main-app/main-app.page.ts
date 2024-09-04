import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './main-app.page.html',
  styleUrls: ['./main-app.page.scss'],
})
export class MainAppPage  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
