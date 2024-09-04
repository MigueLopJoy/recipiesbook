import { Routes } from '@angular/router';

export const MAIN_APP_ROUTES: Routes = [
        {
            path: '',
            loadComponent: () => import('./main-app.page').then(c => c.MainAppPage),
            children: [
                {
                    path: '',
                    redirectTo: 'explore',
                    pathMatch: 'full',
                },
                {
                    path: 'explore', 
                    loadComponent: () => import('./explore/explore.page').then(c => c.ExplorePage)
                },
                {
                    path: 'profile', 
                    loadComponent: () => import('./profile/profile.page').then(c => c.ProfilePage)
                },
                {
                    path: 'create-recipie', 
                    loadComponent: () => import('./create-recipie/create-recipie.component').then(c => c.CreateRecipiePage)
                }
            ]
        }
];
