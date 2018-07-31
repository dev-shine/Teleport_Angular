import { Component, Inject } from "@angular/core";
import { Router }            from "@angular/router";

import "rxjs/add/operator/first";

import { Store, ReducerManagerDispatcher } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import * as actions from "teleport-module-services/services/v1/ngrx/applications/applications.actions";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-apps-create",
    templateUrl: "apps-create.html",
})
export class TeleportDevPortalAppsCreateComponent {

    public isBusy = false;
    public appName = "";
    public appNotes = "";

    private _developer: IDeveloper;

    constructor (
        @Inject(Router) private router: Router,
        @Inject(Store)  private store$: Store<TeleportCoreState>,
        @Inject(ReducerManagerDispatcher) private dispatcher: ReducerManagerDispatcher,
    ) {
        
        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just())
            .subscribe((s: ILoginAsResponse<IDeveloper>) => this._developer = s.userData);
    }


    public onSubmitCreateApp () {

        this.isBusy = true;

        const dev = this._developer;
        const appName = this.appName;
        const notes = this.appNotes;

        this.dispatcher
            .first(action => action.type === actions.CREATE_SUCCESS || action.type === actions.CREATE_FAILURE)
            .subscribe((action: actions.CreateSuccess) => {

                switch (action.type) {

                    case actions.CREATE_SUCCESS:
                        this.isBusy = false;
                        return this.router.navigate(["/v1/applications", action.payload.app.name]);

                    default:
                        this.isBusy = false;
                }
            });

        this.store$.dispatch(new actions.Create({ dev, appName, notes }));    
    }
}
