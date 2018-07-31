import { ActivatedRouteSnapshot, CanActivateChild, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
export declare class PermsGuardCanActivate implements CanActivateChild {
    private router;
    private store$;
    constructor(router: Router, store$: Store<TeleportCoreState>);
    canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean>;
}
