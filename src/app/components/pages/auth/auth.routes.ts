import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const AUTH_ROUTES: Routes = [
    {
        path: '',  
        loadComponent: () => import('./auth.page').then(c => c.AuthPage),
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login', 
                loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
            },
            {
                path: 'register', 
                loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent)
            }
        ]
    }
];