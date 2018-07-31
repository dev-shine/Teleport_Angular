import { Component, Inject, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { APIv1State } from "teleport-module-services/services/v1/ngrx/index";
import { Refresh } from "teleport-module-services/services/v1/ngrx/applications/applications.actions";
import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { IApplication } from "teleport-module-services/services/v1/models/Application";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-apps",
    templateUrl: "apps.html",
})
export class TeleportDevPortalAppsComponent implements OnInit, OnDestroy {

    public Developer: IDeveloper;

    public sortBy = [ this.sortByNameAsc ];
    public filterOn = "";
    public showNum = 20;

    private _applications: IApplication[] = [];

    private _isBusy = false;

    constructor (
        @Inject(Store) private store$: Store<TeleportCoreState & APIv1State>,
    ) {}

    public ngOnInit () {

        this._isBusy = true;

        this.store$.select("session")
            .filter(s => s.isJust())
            .map(s => s.just())
            .subscribe((s: ILoginAsResponse<IDeveloper>) => this.Developer = s.userData);

        this.store$.select("v1_applications")
            .subscribe((apps: IApplication[]) => {
                this._isBusy = false;
                this._applications = apps;
            });
    }

    public ngOnDestroy () {
        delete this.Developer;
        this._applications = [];
        // Just to shutup the TS checker.
        this.sortBy = [ this.sortByNameDesc, this.sortByNotesAsc, this.sortByNotesDesc, this.sortByCreatedOnAsc, this.sortByCreatedOnDesc ];
    }

    public get isBusy () {
        return this._isBusy;
    }

    public get totalApps () {
        return this._applications.length;
    }

    public get Applications () {
        return this.sortBy
            .reduce((apps, s) => apps.sort(s), this._applications.slice(0))
            .filter(app => ["friendlyName", "notes", "name"].some(param => (app as any)[param].toLowerCase().includes(this.filterOn.toLowerCase())))
            .slice(0, this.showNum);
    }

    public requestAppsRefresh () {
        this.store$.dispatch(new Refresh({ dev: this.Developer }));
    }


    public hasSort (funcName: string) {
        return this.sortBy.indexOf((this as any)[funcName]) !== -1;
    }

    public toggleSort (param: string) {

        if (this.hasSort(`sortBy${param}Asc`)) {
            this.sortBy.splice(this.sortBy.indexOf((this as any)[`sortBy${param}Asc`]), 1);
            this.sortBy.push((this as any)[`sortBy${param}Desc`]);
        } else if (this.hasSort(`sortBy${param}Desc`)) {
            this.sortBy.splice(this.sortBy.indexOf((this as any)[`sortBy${param}Desc`]), 1);
        } else {
            this.sortBy.push((this as any)[`sortBy${param}Asc`]);
        }
    }


    private sortByNameAsc (a: IApplication, b: IApplication) {
        return a.friendlyName.localeCompare(b.friendlyName);
    }

    private sortByNameDesc (a: IApplication, b: IApplication) {
        return b.friendlyName.localeCompare(a.friendlyName);
    }

    private sortByNotesAsc (a: IApplication, b: IApplication) {
        return a.notes.localeCompare(b.notes);
    }

    private sortByNotesDesc (a: IApplication, b: IApplication) {
        return b.notes.localeCompare(a.notes);
    }

    private sortByCreatedOnAsc (a: IApplication, b: IApplication) {
        return +a.createdAt - +b.createdAt;
    }

    private sortByCreatedOnDesc (a: IApplication, b: IApplication) {
        return +b.createdAt - +a.createdAt;
    }
}
