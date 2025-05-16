import { Routes } from '@angular/router';

import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', loadComponent: () => import('./features/users/register/register.component').then((c) => c.RegisterComponent) },
    { path: 'login', loadComponent: () => import('./features/users/login/login.component').then((c) => c.LoginComponent) },
    { path: 'user-profile', loadComponent: () => import('./features/users/user-profile/user-profile.component').then((c) => c.UserProfileComponent), canActivate: [authGuard] },
    { path: 'user-management', loadComponent: () => import('./features/users/user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: 'project-management', loadComponent: () => import('./features/projects/project-management/project-management.component').then((c) => c.ProjectManagementComponent), canActivate: [authGuard] },
    { path: 'project-form', loadComponent: () => import('./features/projects/project-form/project-form.component').then((c) => c.ProjectFormComponent), canActivate: [authGuard] },
    { path: 'project-form/:id', loadComponent: () => import('./features/projects/project-form/project-form.component').then((c) => c.ProjectFormComponent), canActivate: [authGuard] },
    { path: 'project-details/:id', loadComponent: () => import('./features/projects/project-details/project-details.component').then((c) => c.ProjectDetailsComponent), canActivate: [authGuard] },
    { path: 'requirement-details/:id', loadComponent: () => import('./features/requirements/requirement-details/requirement-details.component').then((c) => c.RequirementDetailsComponent), canActivate: [authGuard] },
    { path: 'testcase-form', loadComponent: () => import('./features/tests/testcase-form/testcase-form.component').then((c) => c.TestcaseFormComponent), canActivate: [authGuard] },
    { path: 'testcase-form/:id', loadComponent: () => import('./features/tests/testcase-form/testcase-form.component').then((c) => c.TestcaseFormComponent), canActivate: [authGuard] },
    { path: 'testcase-details/:id', loadComponent: () => import('./features/tests/testcase-details/testcase-details.component').then((c) => c.TestcaseDetailsComponent), canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' },
];