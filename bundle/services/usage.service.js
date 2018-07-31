import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";
var UsageService = (function () {
    function UsageService(http, store$) {
        var _this = this;
        this.http = http;
        this.store$ = store$;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
    }
    UsageService.prototype.pullUsage = function (req) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "data",
            "usage",
        ].join("/");
        var search = new URLSearchParams();
        search.set("begin_date", req.beginDate.toISOString());
        search.set("end_date", req.endDate.toISOString());
        if (req.appId) {
            search.set("app_id", req.appId);
        }
        return this.http.get(url, { search: search.toString(), withCredentials: true })
            .map(function (resp) { return resp.json().data; })
            .map(function (data) { return ({
            beginDate: new Date(data.begin_date),
            endDate: new Date(data.end_date),
            usage: data.usage,
        }); })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Usage Report Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    UsageService.decorators = [
        { type: Injectable },
    ];
    UsageService.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return UsageService;
}());
export { UsageService };
//# sourceMappingURL=usage.service.js.map