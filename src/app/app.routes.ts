import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/pages/main-app/main-app.routes').then(c => c.MAIN_APP_ROUTES),
        canActivate: [AuthGuard],
    },
    {
        path: 'auth', 
        loadChildren: () => import('./components/pages/auth/auth.routes').then(c => c.AUTH_ROUTES)
    }
];