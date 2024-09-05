import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { ShareTitlesService } from '../../../../core/services/share-data/share-titles/share-titles.service';
import { addIcons } from "ionicons";
import { personAddOutline } from "ionicons/icons";
import { LoginService } from '../../../../core/services/auth/login/login.service';
import { LoginRequest } from '../../../../core/model/auth/login/login-request';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { UtilsService } from '../../../../core/services/utils/utils.service';
import { ShareRegisterDataService } from '../../../../core/services/share-data/share-register/share-register-data.service';

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
    private utilsService: UtilsService,
    private shareRegisterDataService: ShareRegisterDataService
  ) {
      addIcons({personAddOutline});
    }

  pageTitle: string = 'Login';
  registerSuccess: boolean = false;

  login(loginRequest: LoginRequest): void {
    this.utilsService.loading().subscribe({
      next: (loading: HTMLIonLoadingElement) => {
        loading.present();
        this.loginService.login(loginRequest).subscribe({
          next: (res: UserCredential) => {
            console.log(res)
          },
          error: (error: Error) => {
            this.utilsService.presentToast({
              message: error.message,
              duration: 3000,
              color: 'danger',
              position: 'top',
              icon: 'alert'
            })
          }
        })
        loading.dismiss();
      }
    })
  }


  getRegisterNotification(): void {
    this.shareRegisterDataService.registrationSuccess.subscribe({
      next: () => {
        this.registerSuccess = true;
      }
    })
  }

  ngOnInit() {
    this.shareTitlesService.emitTitle(this.pageTitle);    
    this.getRegisterNotification();  
  }

}
