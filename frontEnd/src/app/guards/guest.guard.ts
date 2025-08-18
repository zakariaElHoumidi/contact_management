import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { routes_paths } from '../app.routes_paths';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authService.isAuthenticated())
    return true;
  else {
    router.navigate([`/${routes_paths.user.root}/${routes_paths.user.children.home}`])
    return false
  }
};
