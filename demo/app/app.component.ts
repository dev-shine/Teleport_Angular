
import { Component, ModuleWithProviders, Inject } from "@angular/core";
import { Routes, RouterModule, Router }           from "@angular/router";

import { devPortalServices } from "teleport-module-dev-portal";
import DevPortalSessionService = devPortalServices.SessionService;

/**
 * This component embeds your component on the page with its selector.
 * The selector is set under /module/module.component.ts.
 */
@Component({
  selector: "teleport-demo-app",
  template: `
      <h1>Module Demo Page</h1>
      <!--p><a [routerLink]="/login">Login Page</a></p-->
      <teleport-login></teleport-login>
  `,
})
export class AppComponent  {

    constructor(
        @Inject(DevPortalSessionService) private session: DevPortalSessionService,
        @Inject(Router) router: Router,
    ) {
        router.events.subscribe(e => console.log("AppComponentWithRouting =>", e));
        console.log(this.session);
    }
}

const routes: Routes = [{
        path       : "demo",
        redirectTo : "/module-page",
        pathMatch  : "full",
    },
    // {
    //     path       : "login",
    //     component  : TeleportDevPortalLoginComponent,
    // },
];

// export const appRoutingProviders: any[] = [];

export const appRouting = RouterModule.forRoot(routes) as ModuleWithProviders;
