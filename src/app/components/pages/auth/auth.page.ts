import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from "ionicons";
import { IonRouterOutlet, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [IonContent, IonRouterOutlet, ],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.scss',
})
export class AuthPage  implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  loginForm!: FormGroup;

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    })
  }


  ngOnInit() {}



}
