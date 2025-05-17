import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserService } from '../services/user.service';
import { map, catchError, of } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.getCurrentUser().pipe(
    map(user => {
      if (user) {
        router.navigate(['/landing']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      return of(true);
    })
  );
};