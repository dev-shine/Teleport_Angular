import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Store } from "@ngrx/store";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";
var TopUpService = (function () {
    function TopUpService(http, store$) {
        var _this = this;
        this.http = http;
        this.store$ = store$;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
    }
    Object.defineProperty(TopUpService.prototype, "Observable", {
        get: function () {
            var _this = this;
            if (!this._observable) {
                this._observable = Observable
                    .create(function (observer) { return _this._observer = observer; })
                    .do(function (topUp) { return _this._topUp = topUp; })
                    .multicast(new BehaviorSubject(this._topUp))
                    .refCount();
                this.refresh();
            }
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    TopUpService.prototype.refresh = function () {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/top-up",
        ].join("/");
        this.http.get(url, { withCredentials: true })
            .map(function (resp) { return resp.json().topUp; })
            .subscribe(function (resp) { return _this._observer.next(resp); }, function (err) { return _this.store$.dispatch(new msgActions.Add(new Message("Top-Up Failure", err.json().user_message))); });
    };
    TopUpService.prototype.updateTopUp = function (data) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/top-up",
        ].join("/");
        var headers = new Headers({ "Content-Type": "application/json" });
        this.http.post(url, JSON.stringify(data), { headers: headers, withCredentials: true })
            .map(function (resp) { return resp.json().topUp; })
            .subscribe(function (resp) { return _this._observer.next(resp); }, function (err) { return _this.store$.dispatch(new msgActions.Add(new Message("Top-Up Failure", err.json().user_message))); });
    };
    TopUpService.decorators = [
        { type: Injectable },
    ];
    TopUpService.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return TopUpService;
}());
export { TopUpService };
//# sourceMappingURL=top-up.service.js.map