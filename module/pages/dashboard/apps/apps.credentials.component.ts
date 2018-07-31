import { Component, Inject, Input, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { Store, ReducerManagerDispatcher } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
// import { Message } from "teleport-module-services/services/models/Message";
// import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { APIv1State } from "teleport-module-services/services/v1/ngrx/index";
import { Refresh } from "teleport-module-services/services/v1/ngrx/applications/applications.actions";
import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { IApplication } from "teleport-module-services/services/v1/models/Application";
import { IAppCredentials } from "teleport-module-services/services/v1/models/AppCredentials";

import * as actions from "teleport-module-services/services/v1/ngrx/applications/applications.actions";

import { ModalService } from "../../../services/modal.service";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-app-credentials",
    templateUrl: "apps.credentials.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalAppCredentialsComponent implements OnDestroy {

    @Input() public set app (a: IApplication) {
        this.Credentials = a.credentials;
        this._app = a;
    }

    public isBusy = false;
    public Credentials: IAppCredentials[] = [];

    private _app: IApplication;
    private _developer: IDeveloper;
    private _subscription: Subscription;

    constructor (
        @Inject(Store) private store$: Store<TeleportCoreState & APIv1State>,
        @Inject(ReducerManagerDispatcher) private dispatcher: ReducerManagerDispatcher,
        @Inject(ModalService) private modal: ModalService,
    ) {


        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just())
            .subscribe((s: ILoginAsResponse<IDeveloper>) => this._developer = s.userData);

        const OK_ACTIONS = [
            actions.CREATE_CREDS, actions.CREATE_CREDS_SUCCESS, actions.CREATE_CREDS_FAILURE,
            actions.REMOVE_CREDS, actions.REMOVE_CREDS_SUCCESS, actions.REMOVE_CREDS_FAILURE,
        ];
        this._subscription = this.dispatcher
            .filter(action => OK_ACTIONS.indexOf(action.type) !== -1)
            .subscribe((action: actions.CreateCredsSuccess) => {

                switch (action.type) {

                    case actions.CREATE_CREDS:
                    case actions.REMOVE_CREDS:
                        this.isBusy = true;
                        break;

                    // case actions.CREATE_CREDS_SUCCESS:
                    //     this.isBusy = false;
                    //     // this._app = action.payload.app;
                    //     break;

                    // case actions.REMOVE_CREDS_SUCCESS:
                    //     this.isBusy = false;
                    //     // this.Credentials = this.Credentials.filter(c => c.apiKey !== cred.apiKey);
                    //     break;

                    default:
                        this.isBusy = false;
                }
            });
    }


    public ngOnDestroy () {
        this._subscription.unsubscribe();
        delete this._app;
        this.Credentials = [];
    }


    public createCred () {

        this.store$.dispatch(new actions.CreateCreds({ dev: this._developer, app: this._app }));
    }

    public deleteCred (creds: IAppCredentials) {

        this.modal.show("Delete Credential", `<p>Clicking OK will delete the "${creds.apiKey}" credential.</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this.store$.dispatch(new actions.RemoveCreds({ dev: this._developer, app: this._app, creds }));
                }
            });
    }

    public apiKeyInputFocus (event: FocusEvent) {
        (event.target as HTMLInputElement).type = "text";
        (event.target as HTMLInputElement).select();
    }

    public apiKeyInputBlur (event: FocusEvent) {
        (event.target as HTMLInputElement).type = "password";
    }
}
