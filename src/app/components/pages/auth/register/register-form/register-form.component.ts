import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { addIcons } from "ionicons";
import { mailOutline, lockClosedOutline, eyeOffOutline, eyeOutline, logInOutline, personOutline } from "ionicons/icons";
import { IonItem, IonIcon, IonInput, IonButton } from "@ionic/angular/standalone";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../../../core/model/auth/register/register-request';
import { passwordMatchValidator } from '../../../../../core/validators/passwordMatch.validator';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, IonButton, IonInput, IonIcon, IonItem, ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {

  constructor(
    private fb: FormBuilder
  ) {
    addIcons({personOutline,mailOutline,lockClosedOutline,logInOutline, eyeOffOutline, eyeOutline});
  }

  @Output() register: EventEmitter<RegisterRequest> = new EventEmitter<RegisterRequest>;
  registerRequest!: RegisterRequest;
  registerForm!: FormGroup;
  hide: boolean = true;
  inputType: string = 'password';

  initRegisterForm(): void {
    this.registerForm = this.fb.nonNullable.group({
      firstname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/)
      ]],
      lastname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/)
      ]],
      userName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z0-9](?:[._]?[a-zA-Z0-9])*$/)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(16), 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(16), 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/)
      ]]
    }, {validators: passwordMatchValidator});
  }
  
  get firstname(): FormControl {
    return this.registerForm.controls['firstname'] as FormControl;
  }

  get lastname(): FormControl {
    return this.registerForm.controls['lastname'] as FormControl;
  }

  get userName(): FormControl {
    return this.registerForm.controls['userName'] as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.controls['email'] as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.controls['password'] as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registerForm.controls['confirmPassword'] as FormControl;
  }

  togglePasswordDisplay(): void {
    this.hide = !this.hide;

    if (this.hide) this.inputType = 'password';
    else this.inputType = 'text';
  }

  submit(event: Event): void {
    event.preventDefault();
    
    if (this.registerForm.invalid) return;

    const { firstname, lastname, userName, email, password } = this.registerForm.value;

    this.register.emit({
      firstname: firstname || '',
      lastname: lastname || '',
      userName: userName || '',
      email: email || '',
      password: password || '',
    })

  }

  ngOnInit() {
    this.initRegisterForm();
  }

}
