import { Component, inject } from '@angular/core';
import { classes } from '../../config';
import { AuthService } from '../../services/auth.service';
import { routes_paths } from '../../app.routes_paths';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  private readonly _authService: AuthService = inject(AuthService);

  redirectTo: string = this._authService.isAuthenticated() ? `/${routes_paths.user.root}/${routes_paths.user.children.home}` : `/${routes_paths.auth.root}/${routes_paths.auth.children.login}`;
  duration = classes.duration
  padding = classes.padding
}
