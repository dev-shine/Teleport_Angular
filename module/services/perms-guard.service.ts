
import { Injectable, Inject } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
} from "@angular/router";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IUserPermissions } from "teleport-module-services/services/v1/models/User";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { validate }         from "../utils/Permissions";


interface IRouteData {
    perms: string[];
    withSome?: boolean;
}

@Injectable()
export class PermsGuardCanActivate implements CanActivateChild {

    constructor (
        @Inject(Router) private router: Router,
        @Inject(Store)  private store$: Store<TeleportCoreState>,
    ) {}

    public canActivateChild (route: ActivatedRouteSnapshot): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just().userData)
            .subscribe(dev => {

                    const routeData = route.data as IRouteData;

                    if (routeData.perms && ! validate(dev.permissions, routeData.perms.reduce((p: IUserPermissions, c: string) => (p[c] = true) && p, {}))) {

                        this.router.navigate(["/v1/access-denied"], { queryParams: { perms: routeData.perms.join("|") } })
                            .then(() => resolve(false))
                            .catch(err => reject(err));
                    }

                    return resolve(true);
                });
        });
    }
}
