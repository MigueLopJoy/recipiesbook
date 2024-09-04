import { Routes } from '@angular/router';

export const routes: Routes = [
    // {
    //     path: '',
    //     loadChildren: () => import('./components/pages/main-app/main-app.routes').then(c => c.MAIN_APP_ROUTES)
    // },
    {
        path: '', 
        loadChildren: () => import('./components/pages/auth/auth.routes').then(c => c.AUTH_ROUTES)
    }
];