import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute }       from "@angular/router";

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeUntil";

import { Store, ReducerManagerDispatcher } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { APIv1State } from "teleport-module-services/services/v1/ngrx/index";
import { Refresh } from "teleport-module-services/services/v1/ngrx/applications/applications.actions";
import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { IApplication } from "teleport-module-services/services/v1/models/Application";

import * as actions from "teleport-module-services/services/v1/ngrx/applications/applications.actions";

import { ModalService } from "../../../services/modal.service";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-app-detail",
    templateUrl: "apps.id.html",
})
export class TeleportDevPortalAppByIdComponent implements OnInit, OnDestroy {

    public isBusy = false;
    public isEditing = false;
    public appId = "";
    public appName = "";
    public appNotes = "";

    private _developer: IDeveloper;
    private _application: IApplication;

    private unsubscriber = new Subject();

    constructor (
        @Inject(Router)                   private router: Router,
        @Inject(ModalService)             private modal: ModalService,
        @Inject(ActivatedRoute)           private route: ActivatedRoute,
        @Inject(Store)                    private store$: Store<TeleportCoreState & APIv1State>,
        @Inject(ReducerManagerDispatcher) private dispatcher: ReducerManagerDispatcher,
    ) {}

    public ngOnInit () {

        this.route.params
            .first()
            .subscribe(params => {
                
                this.appId = params.appId;

                this.store$.select("session")
                    .takeUntil(this.unsubscriber)
                    .filter(s => s.isJust())
                    .map(s => s.just())
                    .subscribe((s: ILoginAsResponse<IDeveloper>) => this._developer = s.userData);
        
                this.store$.select("v1_applications")
                    .takeUntil(this.unsubscriber)
                    .map(apps => apps.find(app => app.name === this.appId))
                    .subscribe(app => {
                        if (! app) {
                            this.router.navigate(["/v1/applications"]);
                        } else {
                            this._application = app;
                            this.appName = app.friendlyName;
                            this.appNotes = app.notes;
                        }
                    });
        
                const OK_ACTIONS = [
                    actions.UPDATE, actions.UPDATE_SUCCESS, actions.UPDATE_FAILURE,
                    actions.REMOVE, actions.REMOVE_SUCCESS, actions.REMOVE_FAILURE,
                ];
                this.dispatcher
                    .takeUntil(this.unsubscriber)
                    .filter(action => OK_ACTIONS.indexOf(action.type) !== -1)
                    .subscribe((action: actions.UpdateSuccess) => {
        
                        switch (action.type) {
        
                            case actions.UPDATE:
                            case actions.REMOVE:
                                this.isBusy = true;
                                break;
        
                            // case actions.REMOVE_SUCCESS:
                            //     this.router.navigate(["/v1/applications"]);
                            //     break;
        
                            default:
                                this.isBusy = false;
                        }
                    });
            });
    }

    public ngOnDestroy () {
        this.unsubscriber.complete();
        delete this._application;
        this.isBusy = false;
        this.isEditing = false;
        this.appId = "";
        this.appName = "";
        this.appNotes = "";
    }


    public get App () {
        return this._application;
    }


    public editApp () {
        if (this._application) {
            this.isEditing = true;
            this.appName = this._application.friendlyName;
            this.appNotes = this._application.notes;
        }
    }


    public deleteApp () {

        this.modal.show("Delete Application", `<p>Clicking OK will delete "${this.App.friendlyName}".</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this.store$.dispatch(new actions.Remove({ dev: this._developer, app: this._application }));
                }
            });
    }


    public saveChanges () {
        this.isEditing = false;
        this.store$.dispatch(new actions.Update({ dev: this._developer, app: this.App, appName: this.appName, notes: this.appNotes }));
    }


    public cancelChanges () {
        this.isEditing = false;
    }
}
