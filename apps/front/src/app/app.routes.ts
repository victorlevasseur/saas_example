import { Route } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '**', // FIXME: create a container for all authenticated routes.
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/platform/platform.routes').then((m) => m.platformRoutes),
  },
];
