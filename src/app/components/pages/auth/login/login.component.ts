import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { ShareTitlesService } from '../../../../core/services/share-data/share-titles/share-titles.service';
import { addIcons } from "ionicons";
import { personAddOutline } from "ionicons/icons";
import { LoginService } from '../../../../core/services/auth/login/login.service';
import { LoginRequest } from '../../../../core/model/auth/login/login-request';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { Router, RouterLink } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { UtilsService } from '../../../../core/services/utils/utils.service';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../../core/services/auth/auth.service';

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
    private router: Router,
    private authService: AuthService
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
          next: (credential: UserCredential) => {
            this.authenticate(credential);
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

  authenticate(credential: UserCredential): void {
    this.authService.authenticate().subscribe({
      next: (user: User | null) => {
        if (user == credential.user)
          this.router.navigate(['/'])
        }
    })
  }

  ngOnInit() {
    this.shareTitlesService.emitTitle(this.pageTitle);    
  }

}
