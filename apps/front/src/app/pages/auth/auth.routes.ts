import { Route } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthLayoutComponent } from './auth-layout.component';

export const authRoutes: Route[] = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '**',
        component: AuthComponent,
      }
    ]
  }
];
