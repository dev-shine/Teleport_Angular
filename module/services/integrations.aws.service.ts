
import { Injectable, Inject }            from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable }      from "rxjs/Observable";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { IAWS } from "../models/interfaces";

declare const API_BASE_URL: string;


export interface IAWSPutRequest {
    accessKey: string;
    securityKey: string;
    s3: {
        region?: string;
        bucket: string;
    };
}


@Injectable()
export class IntegrationsAWSService {

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


    public getAWS (appId: string): Promise<IAWS> {

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/aws",
        ].join("/");

        return this.http
            .get(url, { withCredentials: true })
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map(r => r.json().settings)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("AWS Service Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }


    public putAWS (appId: string, aws: IAWSPutRequest): Promise<IAWS> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/aws",
        ].join("/");

        return this.http
            .put(url, JSON.stringify(aws), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map(r => r.json().settings)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("AWS Service Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }


    public deleteAWS (appId: string): Promise<IAWS> {

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/aws",
        ].join("/");

        return this.http
            .delete(url, { withCredentials: true })
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map(r => r.json().settings)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("AWS Service Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }
}
