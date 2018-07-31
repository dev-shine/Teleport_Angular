import { Injectable, Inject } from "@angular/core";
import { Http, Headers }      from "@angular/http";

import { Observable }      from "rxjs/Observable";
import { Observer }        from "rxjs/Observer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { ITopUp } from "../models/interfaces";


declare const API_BASE_URL: string;


@Injectable()
export class TopUpService {

    private _developer: IDeveloper;
    private _topUp: ITopUp;

    private _observable: Observable<ITopUp>;
    private _observer: Observer<ITopUp>;

    constructor(
        @Inject(Http)  private http: Http,
        @Inject(Store) private store$: Store<TeleportCoreState>,
    ) {
        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just())
            .subscribe((s: ILoginAsResponse<IDeveloper>) => this._developer = s.userData);
    }


    public get Observable (): Observable<ITopUp> {

        if (! this._observable) {

            this._observable = Observable
                .create((observer: Observer<ITopUp>) => this._observer = observer)
                .do((topUp: ITopUp) => this._topUp = topUp)
                .multicast(new BehaviorSubject(this._topUp))
                .refCount();

            this.refresh();
        }

        return this._observable;
    }


    public refresh () {

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/top-up",
        ].join("/");

        this.http.get(url, { withCredentials: true })
            .map(resp => resp.json().topUp as ITopUp)
            .subscribe(
                resp => this._observer.next(resp),
                err  => this.store$.dispatch(new msgActions.Add(new Message("Top-Up Failure", err.json().user_message))),
            );
    }


    public updateTopUp (data: ITopUp) {

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/top-up",
        ].join("/");

        const headers = new Headers({ "Content-Type": "application/json" });

        this.http.post(url, JSON.stringify(data), { headers, withCredentials: true })
            .map(resp => resp.json().topUp as ITopUp)
            .subscribe(
                resp => this._observer.next(resp),
                err  => this.store$.dispatch(new msgActions.Add(new Message("Top-Up Failure", err.json().user_message))),
            );
    }
}
