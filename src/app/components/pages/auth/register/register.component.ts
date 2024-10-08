import { Component, OnInit } from '@angular/core';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterRequest } from '../../../../core/model/auth/register/register-request';
import { UtilsService } from '../../../../core/services/utils/utils.service';
import { RegisterService } from '../../../../core/services/auth/register/register.service';
import { addIcons } from "ionicons";
import { IonIcon, IonButton } from "@ionic/angular/standalone";
import { UserCredential } from 'firebase/auth';
import { UsersService } from '../../../../core/services/users/users.service';
import { Router } from '@angular/router';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonButton, IonIcon, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  constructor(
    private registerService: RegisterService,
    private utilsService: UtilsService,
    private usersService: UsersService,
    private router: Router
  ) {
      addIcons({}); 
    }


  register(request: RegisterRequest): void {
    this.utilsService.loading().subscribe({
      next: (loading: HTMLIonLoadingElement) => {
        loading.present();
        this.registerService.register(request).subscribe({
          next: (response: UserCredential) => {            
            this.addUser(request, response.user.uid).subscribe({
              next: (userDoc: DocumentData) => {
                if (userDoc) this.usersService.setUser().subscribe({
                  next: () => this.router.navigate(['/'])            
                });
              }
            });
          }, 
          error: (error: Error) => {
            this.utilsService.presentToast({
                message: error.message,
                duration: 3000,
                color: 'danger',
                position: 'middle',
                icon: 'alert'
            });
          },
        })
        loading.dismiss();
      }
    });
  }

  addUser(request: RegisterRequest, uid: string): Observable<DocumentData> {
    return this.usersService.addUser({
      uid,
      firstname: request.firstname,
      lastname: request.lastname,
      userName: request.userName,
      email: request.email,
      favorites: []
    });
  }

  ngOnInit() {}

}
