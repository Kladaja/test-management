import { Routes } from '@angular/router';

import { authGuard } from './shared/guards/auth.guard';
import { roleGuard } from './shared/guards/role.guard';
import { loginGuard } from './shared/guards/login.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'register', loadComponent: () => import('./features/users/register/register.component').then((c) => c.RegisterComponent), canActivate: [loginGuard] },
    { path: 'login', loadComponent: () => import('./features/users/login/login.component').then((c) => c.LoginComponent), canActivate: [loginGuard] },

    { path: 'user-form', loadComponent: () => import('./features/users/user-form/user-form.component').then((c) => c.UserFormComponent), canActivate: [authGuard, roleGuard(['manager'])] },
    { path: 'user-form/:id', loadComponent: () => import('./features/users/user-form/user-form.component').then((c) => c.UserFormComponent), canActivate: [authGuard] },
    { path: 'user-profile', loadComponent: () => import('./features/users/user-profile/user-profile.component').then((c) => c.UserProfileComponent), canActivate: [authGuard] },
    { path: 'user-profile/:id', loadComponent: () => import('./features/users/user-profile/user-profile.component').then((c) => c.UserProfileComponent), canActivate: [authGuard] },
    { path: 'user-management', loadComponent: () => import('./features/users/user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard, roleGuard(['manager'])] },

    { path: 'project-management', loadComponent: () => import('./features/projects/project-management/project-management.component').then((c) => c.ProjectManagementComponent), canActivate: [authGuard] },
    { path: 'project-form', loadComponent: () => import('./features/projects/project-form/project-form.component').then((c) => c.ProjectFormComponent), canActivate: [authGuard, roleGuard(['manager'])] },
    { path: 'project-form/:id', loadComponent: () => import('./features/projects/project-form/project-form.component').then((c) => c.ProjectFormComponent), canActivate: [authGuard, roleGuard(['manager'])] },
    { path: 'project-details/:id', loadComponent: () => import('./features/projects/project-details/project-details.component').then((c) => c.ProjectDetailsComponent), canActivate: [authGuard] },

    { path: 'requirement-details/:id', loadComponent: () => import('./features/requirements/requirement-details/requirement-details.component').then((c) => c.RequirementDetailsComponent), canActivate: [authGuard] },

    { path: 'testcase-form', loadComponent: () => import('./features/tests/testcase-form/testcase-form.component').then((c) => c.TestcaseFormComponent), canActivate: [authGuard] },
    { path: 'testcase-form/:id', loadComponent: () => import('./features/tests/testcase-form/testcase-form.component').then((c) => c.TestcaseFormComponent), canActivate: [authGuard] },
    { path: 'testcase-details/:id', loadComponent: () => import('./features/tests/testcase-details/testcase-details.component').then((c) => c.TestcaseDetailsComponent), canActivate: [authGuard] },
    { path: 'testcycle-management', loadComponent: () => import('./features/tests/testcycle-management/testcycle-management.component').then((c) => c.TestcycleManagementComponent), canActivate: [authGuard] },
    { path: 'testcycle-form', loadComponent: () => import('./features/tests/testcycle-form/testcycle-form.component').then((c) => c.TestcycleFormComponent), canActivate: [authGuard] },
    { path: 'testcycle-form/:id', loadComponent: () => import('./features/tests/testcycle-form/testcycle-form.component').then((c) => c.TestcycleFormComponent), canActivate: [authGuard] },
    { path: 'testcycle-details/:id', loadComponent: () => import('./features/tests/testcycle-details/testcycle-details.component').then((c) => c.TestcycleDetailsComponent), canActivate: [authGuard] },
    { path: 'testrun-form', loadComponent: () => import('./features/tests/testrun-form/testrun-form.component').then((c) => c.TestrunFormComponent), canActivate: [authGuard] },
    { path: 'testrun-form/:id', loadComponent: () => import('./features/tests/testrun-form/testrun-form.component').then((c) => c.TestrunFormComponent), canActivate: [authGuard] },
    { path: 'testrun-details/:id', loadComponent: () => import('./features/tests/testrun-details/testrun-details.component').then((c) => c.TestrunDetailsComponent), canActivate: [authGuard] },

    { path: 'landing', loadComponent: () => import('./shared/pages/landing/landing.component').then((c) => c.LandingComponent) },
    { path: 'forbidden', loadComponent: () => import('./shared/pages/forbidden/forbidden.component').then((c) => c.ForbiddenComponent) },
    { path: '**', loadComponent: () => import('./shared/pages/not-found/not-found.component').then((c) => c.NotFoundComponent) },
];