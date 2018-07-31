import { Injectable, Inject } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";
var IntegrationsAWSService = (function () {
    function IntegrationsAWSService(http, store$) {
        var _this = this;
        this.http = http;
        this.store$ = store$;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
    }
    IntegrationsAWSService.prototype.getAWS = function (appId) {
        var _this = this;
        var url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/aws",
        ].join("/");
        return this.http
            .get(url, { withCredentials: true })
            .catch(function (err) { return Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().settings; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("AWS Service Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    IntegrationsAWSService.prototype.putAWS = function (appId, aws) {
        var _this = this;
        var headers = new Headers({ "Content-Type": "application/json" });
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        var url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/aws",
        ].join("/");
        return this.http
            .put(url, JSON.stringify(aws), options)
            .catch(function (err) { return Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().settings; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("AWS Service Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    IntegrationsAWSService.prototype.deleteAWS = function (appId) {
        var _this = this;
        var url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/aws",
        ].join("/");
        return this.http
            .delete(url, { withCredentials: true })
            .catch(function (err) { return Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().settings; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("AWS Service Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    IntegrationsAWSService.decorators = [
        { type: Injectable },
    ];
    IntegrationsAWSService.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return IntegrationsAWSService;
}());
export { IntegrationsAWSService };
//# sourceMappingURL=integrations.aws.service.js.map