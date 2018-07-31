import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
var AccountCredentialsService = (function () {
    function AccountCredentialsService(http, store$) {
        var _this = this;
        this.http = http;
        this.store$ = store$;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
    }
    AccountCredentialsService.prototype.cleanup = function () {
        delete this._developer;
    };
    AccountCredentialsService.prototype.list = function (userId) {
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "credentials",
        ].join("/");
        return this.http.get(url, { withCredentials: true })
            .catch(function (err) { return Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return res.json().basicAuthPasswords; })
            .map(function (p) { return p.map(function (p2) { return ({ userName: userId, password: p2 }); }); })
            .catch(function (err) { return Observable.throw(err); })
            .toPromise();
    };
    AccountCredentialsService.prototype.create = function (userId) {
        var headers = new Headers({ "Content-Type": "application/json" });
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "credentials",
        ].join("/");
        return this.http.post(url, "", { headers: headers, withCredentials: true })
            .catch(function (err) { return Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return res.json().basicAuthPasswords; })
            .map(function (p) { return p.map(function (p2) { return ({ userName: userId, password: p2 }); }); })
            .catch(function (err) { return Observable.throw(err); })
            .toPromise();
    };
    AccountCredentialsService.prototype.remove = function (userId, password) {
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "credentials",
            encodeURIComponent(password),
        ].join("/");
        return this.http.delete(url, { withCredentials: true })
            .catch(function (err) { return Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return res.json().basicAuthPasswords; })
            .map(function (p) { return p.map(function (p2) { return ({ userName: userId, password: p2 }); }); })
            .catch(function (err) { return Observable.throw(err); })
            .toPromise();
    };
    AccountCredentialsService.decorators = [
        { type: Injectable },
    ];
    AccountCredentialsService.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return AccountCredentialsService;
}());
export { AccountCredentialsService };
//# sourceMappingURL=account.credentials.service.js.map