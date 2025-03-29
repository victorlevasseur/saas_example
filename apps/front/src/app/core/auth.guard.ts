import { CanActivate, GuardResult, Router } from '@angular/router';
import Session from 'supertokens-web-js/recipe/session';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);

  async canActivate(): Promise<GuardResult> {
    if (await Session.doesSessionExist()) {
      return true;
    } else {
      return this.router.parseUrl('/auth');
    }
  }
}
