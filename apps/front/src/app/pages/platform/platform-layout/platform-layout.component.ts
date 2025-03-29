import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Session from 'supertokens-web-js/recipe/session';

@Component({
  selector: 'app-platform-layout',
  imports: [RouterModule],
  templateUrl: './platform-layout.component.html',
  styleUrl: './platform-layout.component.scss'
})
export class PlatformLayoutComponent {

  private router = inject(Router);

  async logout(): Promise<void> {
    await Session.signOut();
    await this.router.navigate(['/auth']);
  }
}
