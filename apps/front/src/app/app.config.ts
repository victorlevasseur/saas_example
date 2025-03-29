import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import SuperTokens from 'supertokens-web-js';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';
import Session from 'supertokens-web-js/recipe/session';
import { environment } from './environments/environment';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideHttpClient } from '@angular/common/http';

SuperTokens.init({
  appInfo: {
    appName: environment.appName,
    apiDomain: environment.apiDomain,
    apiBasePath: '/auth',
  },
  recipeList: [
    EmailPassword.init(),
    Session.init(),
  ]
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({ uri: environment.apiDomain + '/graphql' }),
        cache: new InMemoryCache(),
        // other options...
      };
    }),
  ],
};
