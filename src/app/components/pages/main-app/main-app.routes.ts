import { Routes } from '@angular/router';

export const MAIN_APP_ROUTES: Routes = [
        {
            path: '',
            loadComponent: () => import('./main-app.page').then(c => c.MainAppPage),
            children: [
                {
                    path: '',
                    redirectTo: 'profile',
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
                    path: 'create-recipe', 
                    loadComponent: () => import('./handle-recipes/create-recipe/create-recipe.component').then(c => c.CreateRecipePage)
                },
                {
                    path: 'edit-recipe/:id', 
                    loadComponent: () => import('./handle-recipes/edit-recipe/edit-recipe.component').then(c => c.EditRecipeComponent)
                },
                {
                    path: 'recipe-details/:id', 
                    loadComponent: () => import('./recipe-details/recipe-details.component').then(c => c.RecipeDetailsComponent)
                }
            ]
        }
];
