import { OnDestroy } from "@angular/core";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { APIv1State } from "teleport-module-services/services/v1/ngrx/index";
import { IApplication } from "teleport-module-services/services/v1/models/Application";
import { IAppCredentials } from "teleport-module-services/services/v1/models/AppCredentials";
import { ModalService } from "../../../services/modal.service";
export declare class TeleportDevPortalAppCredentialsComponent implements OnDestroy {
    private store$;
    private dispatcher;
    private modal;
    app: IApplication;
    isBusy: boolean;
    Credentials: IAppCredentials[];
    private _app;
    private _developer;
    private _subscription;
    constructor(store$: Store<TeleportCoreState & APIv1State>, dispatcher: ReducerManagerDispatcher, modal: ModalService);
    ngOnDestroy(): void;
    createCred(): void;
    deleteCred(creds: IAppCredentials): void;
    apiKeyInputFocus(event: FocusEvent): void;
    apiKeyInputBlur(event: FocusEvent): void;
}
