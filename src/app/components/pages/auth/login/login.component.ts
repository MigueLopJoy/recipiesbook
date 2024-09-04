import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { ShareTitlesService } from '../../../../core/services/share-data/share-titles/share-titles.service';
import { addIcons } from "ionicons";
import { personAddOutline } from "ionicons/icons";
import { LoginService } from '../../../../core/services/auth/login/login.service';
import { LoginRequest } from '../../../../core/model/auth/login/login-request';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonIcon, IonButton, LoginFormComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(
    private shareTitlesService: ShareTitlesService,
    private loginService: LoginService,
  ) {
      addIcons({personAddOutline});}

  pageTitle: string = 'Login';

  login(loginRequest: LoginRequest): void {
    this.loginService.login(loginRequest).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

  ngOnInit() {
    this.shareTitlesService.emitTitle(this.pageTitle);      
    addIcons({personAddOutline}); 
  }

}
