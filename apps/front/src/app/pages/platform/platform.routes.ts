import { Route } from '@angular/router';
import { PlatformLayoutComponent } from './platform-layout/platform-layout.component';
import { TestComponent } from './test/test.component';

export const platformRoutes: Route[] = [
  {
    path: '',
    component: PlatformLayoutComponent,
    children: [
      {
        path: '',
        component: TestComponent,
      },
    ],
  },
];
