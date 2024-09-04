import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from "ionicons";
import { mailOutline, lockClosedOutline, eyeOffOutline, eyeOutline, logInOutline } from "ionicons/icons";
import { IonLabel, IonItem, IonContent, IonIcon, IonInput, IonButton } from "@ionic/angular/standalone";
import { LoginRequest } from '../../../../../core/model/auth/login/login-request';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [IonButton, IonInput, IonIcon, IonContent, IonItem, IonLabel, ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {

  constructor(
    private fb: FormBuilder
  ) {
      addIcons({mailOutline,lockClosedOutline,logInOutline,eyeOffOutline, eyeOutline,}); 
    }

  @Output() login: EventEmitter<LoginRequest> = new EventEmitter<LoginRequest>();
  loginForm!: FormGroup;
  hide: boolean = true;
  inputType: string = 'password';

  initializeForm(): void {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(16), 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/)
      ]]
    })
  }


  get email(): FormControl {
    return this.loginForm.controls['email'] as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.controls['password'] as FormControl;
  }

  togglePasswordDisplay(): void {
    this.hide = !this.hide;

    if (this.hide) this.inputType = 'password';
    else this.inputType = 'text';
  }

  submit(event: Event) {
    event.preventDefault();

    if (this.loginForm.invalid) return;

    const {email, password} = this.loginForm.value;

    this.login.emit({
      email: email || '',
      password: password || ''
    })
  }

  ngOnInit() {
    this.initializeForm();
  }
}
