import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Store } from "@ngrx/store";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";
var UserService = (function () {
    function UserService(http, store$) {
        var _this = this;
        this.http = http;
        this.store$ = store$;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
    }
    UserService.prototype.list = function () {
        var _this = this;
        var options = { withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
        ].join("/");
        return this.http
            .get(url, options)
            .map(function (r) { return r.json().portalUsers; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("List Users Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    UserService.prototype.detail = function (userId) {
        var _this = this;
        var options = { withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            userId,
        ].join("/");
        return this.http
            .get(url, options)
            .map(function (r) { return r.json().portalUser; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("User Info Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    UserService.prototype.create = function (user) {
        var _this = this;
        var headers = new Headers({ "Content-Type": "application/json" });
        var options = { headers: headers, withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
        ].join("/");
        return this.http
            .post(url, JSON.stringify(user), options)
            .map(function (r) { return r.json().portalUser; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Create User Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    UserService.prototype.update = function (user) {
        var _this = this;
        var headers = new Headers({ "Content-Type": "application/json" });
        var options = { headers: headers, withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
        ].join("/");
        return this.http
            .put(url, JSON.stringify(user), options)
            .map(function (r) { return r.json().portalUser; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Update User Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    UserService.prototype.updatePassword = function (user, oldPassword, password) {
        var _this = this;
        var headers = new Headers({ "Content-Type": "application/json" });
        var options = { headers: headers, withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
            "password",
        ].join("/");
        return this.http
            .put(url, JSON.stringify({ oldPassword: oldPassword, password: password }), options)
            .map(function (r) { return r.json().portalUser; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Update Password Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    UserService.prototype.remove = function (user) {
        var _this = this;
        var options = { withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
        ].join("/");
        return this.http
            .delete(url, options)
            .map(function () { return true; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Remove User Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    UserService.prototype.sendInvite = function (user) {
        var _this = this;
        var headers = new Headers({ "Content-Type": "application/json" });
        var options = { headers: headers, withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
            "send-invite",
        ].join("/");
        return this.http
            .post(url, JSON.stringify(user), options)
            .map(function () { return true; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Send Invite Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    UserService.decorators = [
        { type: Injectable },
    ];
    UserService.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map