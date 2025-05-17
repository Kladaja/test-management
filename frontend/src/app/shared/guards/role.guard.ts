import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map, of } from 'rxjs';

export function roleGuard(expectedRoles: string[]): CanActivateFn {
  return () => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.getCurrentUser().pipe(
      map(user => {
        if (user && expectedRoles.includes(user.role)) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['/login']);
        return of(false);
      })
    );
  };
}
