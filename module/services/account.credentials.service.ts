import { Injectable, Inject } from "@angular/core";
import { Http, Headers }      from "@angular/http";

import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { IUserBasicAuth } from "teleport-module-services/services/v1/models/User";

declare const API_BASE_URL: string;


@Injectable()
export class AccountCredentialsService {

    private _developer: IDeveloper;

    constructor (
        @Inject(Http)           private http: Http,
        @Inject(Store)  private store$: Store<TeleportCoreState>,
    ) {

        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just())
            .subscribe((s: ILoginAsResponse<IDeveloper>) => this._developer = s.userData);
    }

    public cleanup () {
        delete this._developer;
    }

    /**
     * Retuns a list of Basic Auth credentials for the Account user.
     * @param {string} userId - ID of User.
     * @returns {Promise<IUserBasicAuth[]>}
     */
    public list (userId: string): Promise<IUserBasicAuth[]> {

        // if (! this._developer) {
        //     return Promise.reject<IUserBasicAuth[]>(new Error("The AccountService did not supply a Developer object."));
        // }

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "credentials",
        ].join("/");

        return this.http.get(url, { withCredentials: true })
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (res => res.json().basicAuthPasswords as string[])
            .map   (p => p.map(p2 => ({userName: userId, password: p2})))
            .catch (err => Observable.throw(err))
            .toPromise();
    }

    /**
     * Creates a new Basic Auth credential.
     * @param {string} userId - ID of User.
     * @returns {Promise<IUserBasicAuth[]>}
     */
    public create (userId: string): Promise<IUserBasicAuth[]> {

        // if (! this._developer) {
        //     return Promise.reject<IUserBasicAuth[]>(new Error("The AccountService did not supply a Developer object."));
        // }

        const headers = new Headers({ "Content-Type": "application/json" });

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "credentials",
            // encodeURIComponent(userId),
        ].join("/");

        return this.http.post(url, "", { headers, withCredentials: true })
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (res => res.json().basicAuthPasswords as string[])
            .map   (p => p.map(p2 => ({userName: userId, password: p2})))
            .catch (err => Observable.throw(err))
            .toPromise();
    }

    /**
     * Logout and then delete the developer account.
     * @param {string} userId - ID of User.
     * @param {string} password - Password of cred to remove.
     * @returns {Promise<IUserBasicAuth[]>}
     */
    public remove (userId: string, password: string): Promise<IUserBasicAuth[]> {

        // if (! this._developer) {
        //     return Promise.reject<IUserBasicAuth[]>(new Error("The AccountService did not supply a Developer object."));
        // }

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "credentials",
            // encodeURIComponent(userId),
            encodeURIComponent(password),
        ].join("/");

        return this.http.delete(url, { withCredentials: true })
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (res => res.json().basicAuthPasswords as string[])
            .map   (p => p.map(p2 => ({userName: userId, password: p2})))
            .catch (err => Observable.throw(err))
            .toPromise();
    }
}
