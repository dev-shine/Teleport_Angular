import { Injectable, Inject } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Store } from "@ngrx/store";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";
var LogsService = (function () {
    function LogsService(http, store$) {
        var _this = this;
        this.http = http;
        this.store$ = store$;
        this._lastRefresh = 0;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
    }
    LogsService.prototype.destroy = function () {
        if (this._observer) {
            this._observer.complete();
        }
        delete this._logs;
    };
    Object.defineProperty(LogsService.prototype, "Observable", {
        get: function () {
            var _this = this;
            if (!this._observable) {
                this._observable = Observable
                    .create(function (observer) { return _this._observer = observer; })
                    .do(function (logs) { return _this._logs = logs; })
                    .multicast(new BehaviorSubject(this._logs))
                    .refCount();
            }
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    LogsService.prototype.refresh = function () {
        var _this = this;
        if (this._lastRefresh > Date.now() - 1000) {
            return Promise.resolve(this._logs);
        }
        this._lastRefresh = Date.now();
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "data",
            "logs",
        ].join("/");
        return this.http.get(url, { search: this._searchParams, withCredentials: true })
            .map(function (resp) { return resp.json().data; })
            .map(function (data) { return ({
            isTruncated: data.is_truncated,
            updatedOn: new Date(),
            beginDate: new Date(data.begin_date),
            endDate: new Date(data.end_date),
            logs: data.logs.map(function (l) { return Object.assign({}, l, { start_time: new Date(l.start_time), end_time: new Date(l.end_time) }); }),
        }); })
            .do(function (logs) { if (_this._observer) {
            _this._observer.next(logs);
        } })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Logs Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    LogsService.prototype.loadLogs = function (logs) {
        this._searchParams = new URLSearchParams();
        if (logs.beginDate) {
            this._searchParams.set("begin_date", logs.beginDate.toISOString());
        }
        if (logs.endDate) {
            this._searchParams.set("end_date", logs.endDate.toISOString());
        }
        if (logs.appId) {
            this._searchParams.set("app_id", logs.appId);
        }
        if (logs.direction !== "both") {
            this._searchParams.set("direction", logs.direction || "inbound");
        }
        if (logs.connectTime) {
            this._searchParams.set("connect_time", String(logs.connectTime));
        }
        return this.refresh();
    };
    LogsService.decorators = [
        { type: Injectable },
    ];
    LogsService.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return LogsService;
}());
export { LogsService };
//# sourceMappingURL=logs.service.js.map