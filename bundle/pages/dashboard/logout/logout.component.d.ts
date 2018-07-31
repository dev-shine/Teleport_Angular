import { OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
export declare class TeleportDevPortalLogoutComponent implements OnInit {
    private store$;
    constructor(store$: Store<TeleportCoreState>);
    ngOnInit(): void;
}
