import { OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
export declare class TeleportDevPortalAccessDeniedComponent implements OnInit, OnDestroy {
    private store$;
    private route;
    private _reqPerms;
    private _devPerms;
    constructor(store$: Store<TeleportCoreState>, route: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly RequiredPermissions: string[];
    hasPermission(perm: string): boolean;
}
