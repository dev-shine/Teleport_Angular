
import { Component, Inject, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import * as actions from "teleport-module-services/services/ngrx/login/login.actions";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-logout",
    templateUrl: "logout.html",
})
export class TeleportDevPortalLogoutComponent implements OnInit {

    constructor (
        @Inject(Store) private store$: Store<TeleportCoreState>,
    ) {}

    public ngOnInit () {
        setTimeout(() => this.store$.dispatch(new actions.Logout()), 1000);
    }
}
