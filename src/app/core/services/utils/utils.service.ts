import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController, ToastOptions } from '@ionic/angular/standalone';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  loading(): Observable<HTMLIonLoadingElement> {
    return from(this.loadingController.create({spinner: 'crescent'}));
  }


  presentToast(options: ToastOptions): void {
    from(this.toastController.create(options)).subscribe({
      next: (toast: HTMLIonToastElement) => {
        toast.present();
      }
    })
  }

}
