import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { routes_paths } from '../app.routes_paths';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuthenticated())
    return true;
  else {
    router.navigate([`/${routes_paths.auth.root}/${routes_paths.auth.children.login}`])
    return false
  }
};
