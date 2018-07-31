import { Router } from "@angular/router";
import "rxjs/add/operator/first";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
export declare class TeleportDevPortalAppsCreateComponent {
    private router;
    private store$;
    private dispatcher;
    isBusy: boolean;
    appName: string;
    appNotes: string;
    private _developer;
    constructor(router: Router, store$: Store<TeleportCoreState>, dispatcher: ReducerManagerDispatcher);
    onSubmitCreateApp(): void;
}
