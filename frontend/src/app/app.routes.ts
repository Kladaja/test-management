import { Routes } from '@angular/router';

import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', loadComponent: () => import('./features/users/register/register.component').then((c) => c.RegisterComponent) },
    { path: 'login', loadComponent: () => import('./features/users/login/login.component').then((c) => c.LoginComponent) },
    { path: 'user-management', loadComponent: () => import('./features/users/user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: 'project-management', loadComponent: () => import('./features/projects/project-management/project-management.component').then((c) => c.ProjectManagementComponent), canActivate: [authGuard] },
    { path: 'user-profile', loadComponent: () => import('./features/users/user-profile/user-profile.component').then((c) => c.UserProfileComponent), canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' },
];