import { Injectable, Inject } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/do";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/toPromise";
import { Store } from "@ngrx/store";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";
import { Alert } from "../models/Alert";
var AlertsService = (function () {
    function AlertsService(http, store$) {
        var _this = this;
        this.http = http;
        this.store$ = store$;
        this._lastRefresh = 0;
        console.log("new AlertsService()", arguments);
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developerId = s.userData.id; });
        this.subject$ = new BehaviorSubject([]);
        this._observable = this.subject$.share();
    }
    AlertsService.prototype.cleanup = function () {
        this.subject$.complete();
    };
    Object.defineProperty(AlertsService.prototype, "Observable", {
        get: function () {
            this.refresh().catch(function (err) { return console.error(err); });
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    AlertsService.prototype.refresh = function () {
        var _this = this;
        if (this._lastRefresh > Date.now() - 5000) {
            return Promise.resolve(this.subject$.getValue());
        }
        this._lastRefresh = Date.now();
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developerId),
            "alerts",
        ].join("/");
        return this.http
            .get(url, { withCredentials: true })
            .map(function (res) { return res.json().alerts.map(function (a) { return new Alert(a); }); })
            .do(function (a) { return _this.subject$.next(a); })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Alert List Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    AlertsService.prototype.add = function (alert) {
        var _this = this;
        var headers = new Headers({ "Content-Type": "application/json" });
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developerId),
            "alerts",
        ].join("/");
        return this.http
            .post(url, JSON.stringify(alert), options)
            .map(function () { return true; })
            .do(function () { return _this.refresh(); })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Add Alert Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    AlertsService.prototype.remove = function (alert) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developerId),
            "alerts",
            alert.id,
        ].join("/");
        return this.http
            .delete(url, { withCredentials: true })
            .map(function () { return true; })
            .do(function () { return _this.refresh(); })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Remove Alert Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    AlertsService.decorators = [
        { type: Injectable },
    ];
    AlertsService.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return AlertsService;
}());
export { AlertsService };
//# sourceMappingURL=alerts.service.js.map