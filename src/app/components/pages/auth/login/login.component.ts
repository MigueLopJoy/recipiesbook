import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { ShareTitlesService } from '../../../../core/services/share-data/share-titles/share-titles.service';
import { addIcons } from "ionicons";
import { personAddOutline } from "ionicons/icons";
import { LoginService } from '../../../../core/services/auth/login/login.service';
import { LoginRequest } from '../../../../core/model/auth/login/login-request';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { Router, RouterLink } from '@angular/router';
import { UtilsService } from '../../../../core/services/utils/utils.service';
import { UserCredential } from '@angular/fire/auth';
import { UsersService } from '../../../../core/services/users/users.service';

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
    private usersService: UsersService
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
          next: (credentials: UserCredential) => {
            this.usersService.setUser();
            this.router.navigate(['/'])
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

  ngOnInit() {
    this.shareTitlesService.emitTitle(this.pageTitle);    
  }

}
