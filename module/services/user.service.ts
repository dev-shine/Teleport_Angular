import { Injectable, Inject } from "@angular/core";
import { Http, Headers }      from "@angular/http";

import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";

import { IUser } from "teleport-module-services/services/v1/models/User";
import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";



declare const API_BASE_URL: string;


/**
 * UserService Class.
 */
@Injectable()
export class UserService {

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

    /**
     * Returns a list of Portal Users.
     * @returns {Promise<IUser[]>}
     */
    public list (): Promise<IUser[]> {

        let options = { withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
        ].join("/");

        return this.http
            .get  (url, options)
            .map  (r => r.json().portalUsers)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("List Users Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }

    /**
     * Returns the details of a Portal User.
     * @param {number} userId - the ID of the Portal User to retrieve.
     * @returns {Promise<IUser>}
     */
    public detail (userId: number): Promise<IUser> {

        let options = { withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            userId,
        ].join("/");

        return this.http
            .get  (url, options)
            .map  (r => r.json().portalUser)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("User Info Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }

    /**
     * Creates a new Portal User
     * @param {IUser} user - the data to create the Portal User.
     * @returns {Promise<IUser>}
     */
    public create (user: IUser): Promise<IUser> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = { headers, withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
        ].join("/");

        return this.http
            .post (url, JSON.stringify(user), options)
            .map  (r => r.json().portalUser)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Create User Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }

    /**
     * Updates the given Portal User.
     * @param {IUser} user - the Portal User to update.
     * @returns {Promise<IUser>}
     */
    public update (user: IUser): Promise<IUser> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = { headers, withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
        ].join("/");

        return this.http
            .put  (url, JSON.stringify(user), options)
            .map  (r => r.json().portalUser)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Update User Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }

    /**
     * Updates the given Portal User password.
     * @param {IUser} user - the Portal User to update.
     * @param {string} oldPassword - the user's current password.
     * @param {string} password - the new password.
     * @returns {Promise<IUser>}
     */
    public updatePassword (user: IUser, oldPassword: string, password: string): Promise<IUser> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = { headers, withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
            "password",
        ].join("/");

        return this.http
            .put  (url, JSON.stringify({ oldPassword, password }), options)
            .map  (r => r.json().portalUser)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Update Password Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }

    /**
     * Deletes a Portal User.
     * @param {IUser} user - the Portal User to delete.
     * @returns {Promise<boolean>}
     */
    public remove (user: IUser): Promise<boolean> {

        let options = { withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
        ].join("/");

        return this.http
            .delete(url, options)
            .map   (() => true)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Remove User Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }

    /**
     * Send an email to the given user.
     * @param {IUser} user
     * @returns {Promise<boolean>}
     */
    public sendInvite (user: IUser): Promise<boolean> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = { headers, withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
            "send-invite",
        ].join("/");

        return this.http
            .post (url, JSON.stringify(user), options)
            .map  (() => true)
            .toPromise()
            .catch(err => {
                this.store$.dispatch(new msgActions.Add(new Message("Send Invite Failure", err.json().user_message)));
                return Promise.reject(err);
            });
    }
}
