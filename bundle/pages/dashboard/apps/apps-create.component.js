import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/operator/first";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import * as actions from "teleport-module-services/services/v1/ngrx/applications/applications.actions";
var TeleportDevPortalAppsCreateComponent = (function () {
    function TeleportDevPortalAppsCreateComponent(router, store$, dispatcher) {
        var _this = this;
        this.router = router;
        this.store$ = store$;
        this.dispatcher = dispatcher;
        this.isBusy = false;
        this.appName = "";
        this.appNotes = "";
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
    }
    TeleportDevPortalAppsCreateComponent.prototype.onSubmitCreateApp = function () {
        var _this = this;
        this.isBusy = true;
        var dev = this._developer;
        var appName = this.appName;
        var notes = this.appNotes;
        this.dispatcher
            .first(function (action) { return action.type === actions.CREATE_SUCCESS || action.type === actions.CREATE_FAILURE; })
            .subscribe(function (action) {
            switch (action.type) {
                case actions.CREATE_SUCCESS:
                    _this.isBusy = false;
                    return _this.router.navigate(["/v1/applications", action.payload.app.name]);
                default:
                    _this.isBusy = false;
            }
        });
        this.store$.dispatch(new actions.Create({ dev: dev, appName: appName, notes: notes }));
    };
    TeleportDevPortalAppsCreateComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-apps-create",
                    templateUrl: "apps-create.html",
                },] },
    ];
    TeleportDevPortalAppsCreateComponent.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: ReducerManagerDispatcher, decorators: [{ type: Inject, args: [ReducerManagerDispatcher,] },] },
    ]; };
    return TeleportDevPortalAppsCreateComponent;
}());
export { TeleportDevPortalAppsCreateComponent };
//# sourceMappingURL=apps-create.component.js.map