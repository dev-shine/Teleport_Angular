
import { Injectable, Inject }            from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable }      from "rxjs/Observable";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { IWatson } from "../models/interfaces";

declare const API_BASE_URL: string;


export interface IWatsonPutRequest {
    textToSpeech: {
        username: string;
        password: string;
    };
}


@Injectable()
export class IntegrationsWatsonService {

    private _developer: IDeveloper;

    constructor(
        @Inject(Http)  private http: Http,
        @Inject(Store) private store$: Store<TeleportCoreState>,
    ) {

        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just())
            .subscribe((s: ILoginAsResponse<IDeveloper>) => this._developer = s.userData);
    }


    public getTextToSpeech (appId: string): Promise<IWatson> {

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");

        return this.http
            .get(url, { withCredentials: true })
            .map(r => r.json().settings)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Watson Service Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }


    public putTextToSpeech (appId: string, watson: IWatsonPutRequest): Promise<IWatson> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");

        return this.http
            .put(url, JSON.stringify(watson), options)
            .map(r => r.json().settings)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Watson Service Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }


    public deleteTextToSpeech (appId: string): Promise<IWatson> {

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");

        return this.http
            .delete(url, { withCredentials: true })
            .map(r => r.json().settings)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Watson Service Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }
}
