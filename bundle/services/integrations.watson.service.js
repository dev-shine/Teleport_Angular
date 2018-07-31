import { Injectable, Inject } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Store } from "@ngrx/store";
import { Message } from "teleport-module-services/services/models/Message";
import * as msgActions from "teleport-module-services/services/ngrx/messages/messages.actions";
var IntegrationsWatsonService = (function () {
    function IntegrationsWatsonService(http, store$) {
        var _this = this;
        this.http = http;
        this.store$ = store$;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
    }
    IntegrationsWatsonService.prototype.getTextToSpeech = function (appId) {
        var _this = this;
        var url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");
        return this.http
            .get(url, { withCredentials: true })
            .map(function (r) { return r.json().settings; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Watson Service Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    IntegrationsWatsonService.prototype.putTextToSpeech = function (appId, watson) {
        var _this = this;
        var headers = new Headers({ "Content-Type": "application/json" });
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        var url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");
        return this.http
            .put(url, JSON.stringify(watson), options)
            .map(function (r) { return r.json().settings; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Watson Service Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    IntegrationsWatsonService.prototype.deleteTextToSpeech = function (appId) {
        var _this = this;
        var url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");
        return this.http
            .delete(url, { withCredentials: true })
            .map(function (r) { return r.json().settings; })
            .toPromise()
            .catch(function (err) {
            _this.store$.dispatch(new msgActions.Add(new Message("Watson Service Failure", err.json().user_message)));
            return Promise.reject(err);
        });
    };
    IntegrationsWatsonService.decorators = [
        { type: Injectable },
    ];
    IntegrationsWatsonService.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return IntegrationsWatsonService;
}());
export { IntegrationsWatsonService };
//# sourceMappingURL=integrations.watson.service.js.map