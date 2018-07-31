
import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute }                       from "@angular/router";

import "rxjs/add/operator/first";
import "rxjs/add/operator/map";

import { Maybe } from "monet";
import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { IUserPermissions } from "teleport-module-services/services/v1/models/User";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";


import { validate } from "../../../utils/Permissions";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-access-denied",
    templateUrl: "access.html",
})
export class TeleportDevPortalAccessDeniedComponent implements OnInit, OnDestroy {

    private _reqPerms: string[] = [];
    private _devPerms: IUserPermissions = {};

    constructor (
        @Inject(Store)          private store$: Store<TeleportCoreState>,
        @Inject(ActivatedRoute) private route: ActivatedRoute,
    ) {}


    public ngOnInit () {

        this._reqPerms = ((this.route.snapshot.queryParams as any).perms || "").split("|");

        (this.store$.select("session") as Store<Maybe<ILoginAsResponse<IDeveloper>>>)
            .first(s => s.isJust())
            .map(s => s.just())
            .subscribe(s => this._devPerms = s.userData.permissions);
    }


    public ngOnDestroy () {
        this._reqPerms = [];
        this._devPerms = {};
    }


    public get RequiredPermissions (): string[] {
        return this._reqPerms;
    }


    public hasPermission (perm: string) {
        return validate (this._devPerms, { [perm]: true });
    }
}
