import { Routes } from '@angular/router';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { routes_paths } from './app.routes_paths';
import { NotFoundComponent } from './exception/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { HomeComponent } from './pages/user/home/home.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  // User
  {
    path: routes_paths?.user?.root,
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: routes_paths?.user?.children?.home,
        component: HomeComponent
      },
    ]
  },

  // Auth
  {
    path: routes_paths?.auth?.root,
    component: GuestLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: routes_paths?.auth?.children?.register,
        component: RegisterComponent
      },
      {
        path: routes_paths?.auth?.children?.login,
        component: LoginComponent
      }
    ]
  },
  { path: '**', component: NotFoundComponent },
];
