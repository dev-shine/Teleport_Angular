import { Component, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeUntil";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import * as actions from "teleport-module-services/services/v1/ngrx/applications/applications.actions";
import { ModalService } from "../../../services/modal.service";
var TeleportDevPortalAppByIdComponent = (function () {
    function TeleportDevPortalAppByIdComponent(router, modal, route, store$, dispatcher) {
        this.router = router;
        this.modal = modal;
        this.route = route;
        this.store$ = store$;
        this.dispatcher = dispatcher;
        this.isBusy = false;
        this.isEditing = false;
        this.appId = "";
        this.appName = "";
        this.appNotes = "";
        this.unsubscriber = new Subject();
    }
    TeleportDevPortalAppByIdComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .first()
            .subscribe(function (params) {
            _this.appId = params.appId;
            _this.store$.select("session")
                .takeUntil(_this.unsubscriber)
                .filter(function (s) { return s.isJust(); })
                .map(function (s) { return s.just(); })
                .subscribe(function (s) { return _this._developer = s.userData; });
            _this.store$.select("v1_applications")
                .takeUntil(_this.unsubscriber)
                .map(function (apps) { return apps.find(function (app) { return app.name === _this.appId; }); })
                .subscribe(function (app) {
                if (!app) {
                    _this.router.navigate(["/v1/applications"]);
                }
                else {
                    _this._application = app;
                    _this.appName = app.friendlyName;
                    _this.appNotes = app.notes;
                }
            });
            var OK_ACTIONS = [
                actions.UPDATE, actions.UPDATE_SUCCESS, actions.UPDATE_FAILURE,
                actions.REMOVE, actions.REMOVE_SUCCESS, actions.REMOVE_FAILURE,
            ];
            _this.dispatcher
                .takeUntil(_this.unsubscriber)
                .filter(function (action) { return OK_ACTIONS.indexOf(action.type) !== -1; })
                .subscribe(function (action) {
                switch (action.type) {
                    case actions.UPDATE:
                    case actions.REMOVE:
                        _this.isBusy = true;
                        break;
                    default:
                        _this.isBusy = false;
                }
            });
        });
    };
    TeleportDevPortalAppByIdComponent.prototype.ngOnDestroy = function () {
        this.unsubscriber.complete();
        delete this._application;
        this.isBusy = false;
        this.isEditing = false;
        this.appId = "";
        this.appName = "";
        this.appNotes = "";
    };
    Object.defineProperty(TeleportDevPortalAppByIdComponent.prototype, "App", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppByIdComponent.prototype.editApp = function () {
        if (this._application) {
            this.isEditing = true;
            this.appName = this._application.friendlyName;
            this.appNotes = this._application.notes;
        }
    };
    TeleportDevPortalAppByIdComponent.prototype.deleteApp = function () {
        var _this = this;
        this.modal.show("Delete Application", "<p>Clicking OK will delete \"" + this.App.friendlyName + "\".</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.store$.dispatch(new actions.Remove({ dev: _this._developer, app: _this._application }));
            }
        });
    };
    TeleportDevPortalAppByIdComponent.prototype.saveChanges = function () {
        this.isEditing = false;
        this.store$.dispatch(new actions.Update({ dev: this._developer, app: this.App, appName: this.appName, notes: this.appNotes }));
    };
    TeleportDevPortalAppByIdComponent.prototype.cancelChanges = function () {
        this.isEditing = false;
    };
    TeleportDevPortalAppByIdComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-app-detail",
                    templateUrl: "apps.id.html",
                },] },
    ];
    TeleportDevPortalAppByIdComponent.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
        { type: ActivatedRoute, decorators: [{ type: Inject, args: [ActivatedRoute,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: ReducerManagerDispatcher, decorators: [{ type: Inject, args: [ReducerManagerDispatcher,] },] },
    ]; };
    return TeleportDevPortalAppByIdComponent;
}());
export { TeleportDevPortalAppByIdComponent };
//# sourceMappingURL=apps.id.component.js.map