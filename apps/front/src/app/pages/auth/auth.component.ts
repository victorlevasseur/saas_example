import {
  Component,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  Inject,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { environment } from '../../environments/environment';

@Component({
  selector: "app-auth",
  template: '<div id="supertokensui"></div>',
})
export class AuthComponent implements OnDestroy, AfterViewInit {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngAfterViewInit() {
    this.loadScript("https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v0.48.0/build/static/js/main.81589a39.js");
  }

  ngOnDestroy() {
    // Remove the script when the component is destroyed
    const script = this.document.getElementById("supertokens-script");
    if (script) {
      script.remove();
    }
  }

  private loadScript(src: string) {
    const script = this.renderer.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.id = "supertokens-script";
    script.onload = () => {
      (window as any).supertokensUIInit('supertokensui', {
        appInfo: {
          appName: environment.appName,
          apiDomain: environment.apiDomain,
          websiteDomain: environment.websiteDomain,
          apiBasePath: "/auth",
          websiteBasePath: "/auth",
        },
        recipeList: [
          (window as any).supertokensUIEmailPassword.init(),
          (window as any).supertokensUISession.init(),
        ],
      });
    };
    this.renderer.appendChild(this.document.body, script);
  }
}
