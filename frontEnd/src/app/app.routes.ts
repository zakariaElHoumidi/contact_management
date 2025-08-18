import { Routes } from '@angular/router';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { routes_paths } from './app.routes_paths';
import { NotFoundComponent } from './exception/not-found/not-found.component';

export const routes: Routes = [
  {
    path: routes_paths?.auth?.root,
    component: GuestLayoutComponent,
    children: [
      {
        path: routes_paths?.auth?.children?.register,
        component: RegisterComponent
      }
    ]
  },
  { path: '**', component: NotFoundComponent },
];
