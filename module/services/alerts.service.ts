
import { Injectable, Inject }            from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable }      from "rxjs/Observable";
import { Observer }        from "rxjs/Observer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/do";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/toPromise";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { IAlert } from "../models/interfaces";
import { Alert }  from "../models/Alert";


declare const API_BASE_URL: string;


@Injectable()
export class AlertsService {

    private _developerId: string;

    private subject$: BehaviorSubject<IAlert[]>;
    private _observable: Observable<IAlert[]>;

    private _lastRefresh = 0;

    constructor(
        @Inject(Http)  private http: Http,
        @Inject(Store) private store$: Store<TeleportCoreState>,
    ) {
        console.log("new AlertsService()", arguments);

        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just())
            .subscribe((s: ILoginAsResponse<IDeveloper>) => this._developerId = s.userData.id);

        this.subject$ = new BehaviorSubject<IAlert[]>([]);
        this._observable = this.subject$.share();
    }


    public cleanup () {
        // this._alerts = [];
        this.subject$.complete();
    }


    public get Observable (): Observable<IAlert[]> {
        this.refresh().catch(err => console.error(err));
        return this._observable;
    }


    public refresh (): Promise<IAlert[]> {

        if (this._lastRefresh > Date.now() - 5000) { return Promise.resolve(this.subject$.getValue()); }
        this._lastRefresh = Date.now();

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developerId),
            "alerts",
        ].join("/");

        return this.http
            .get(url, { withCredentials: true })
            .map   (res => res.json().alerts.map((a: IAlert) => new Alert(a)))
            .do    ((a: IAlert[]) => this.subject$.next(a))
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Alert List Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }
    

    public add (alert: IAlert): Promise<boolean> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developerId),
            "alerts",
        ].join("/");

        return this.http
            .post(url, JSON.stringify(alert), options)
            .map(() => true)
            .do(() => this.refresh())
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Add Alert Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }


    public remove (alert: IAlert): Promise<boolean> {

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developerId),
            "alerts",
            alert.id,
        ].join("/");

        return this.http
            .delete(url, { withCredentials: true })
            .map(() => true)
            .do(() => this.refresh())
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Remove Alert Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }
}
