import { Routes } from '@angular/router';

export const MAIN_APP_ROUTES: Routes = [
        {
            path: '',
            loadComponent: () => import('./main-app.component').then(c => c.MainAppComponent),
            children: [
                {
                    path: '',
                    redirectTo: 'profile',
                    pathMatch: 'full',
                },
                {
                    path: 'explore', 
                    loadComponent: () => import('./explore/explore.component').then(c => c.ExploreComponent)
                },
                {
                    path: 'profile', 
                    loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
                }
            ]
        }
];
