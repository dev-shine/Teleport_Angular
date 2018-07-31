import { Component, Inject, Input } from "@angular/core";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import * as actions from "teleport-module-services/services/v1/ngrx/applications/applications.actions";
import { ModalService } from "../../../services/modal.service";
var TeleportDevPortalAppCredentialsComponent = (function () {
    function TeleportDevPortalAppCredentialsComponent(store$, dispatcher, modal) {
        var _this = this;
        this.store$ = store$;
        this.dispatcher = dispatcher;
        this.modal = modal;
        this.isBusy = false;
        this.Credentials = [];
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
        var OK_ACTIONS = [
            actions.CREATE_CREDS, actions.CREATE_CREDS_SUCCESS, actions.CREATE_CREDS_FAILURE,
            actions.REMOVE_CREDS, actions.REMOVE_CREDS_SUCCESS, actions.REMOVE_CREDS_FAILURE,
        ];
        this._subscription = this.dispatcher
            .filter(function (action) { return OK_ACTIONS.indexOf(action.type) !== -1; })
            .subscribe(function (action) {
            switch (action.type) {
                case actions.CREATE_CREDS:
                case actions.REMOVE_CREDS:
                    _this.isBusy = true;
                    break;
                default:
                    _this.isBusy = false;
            }
        });
    }
    Object.defineProperty(TeleportDevPortalAppCredentialsComponent.prototype, "app", {
        set: function (a) {
            this.Credentials = a.credentials;
            this._app = a;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppCredentialsComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
        delete this._app;
        this.Credentials = [];
    };
    TeleportDevPortalAppCredentialsComponent.prototype.createCred = function () {
        this.store$.dispatch(new actions.CreateCreds({ dev: this._developer, app: this._app }));
    };
    TeleportDevPortalAppCredentialsComponent.prototype.deleteCred = function (creds) {
        var _this = this;
        this.modal.show("Delete Credential", "<p>Clicking OK will delete the \"" + creds.apiKey + "\" credential.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.store$.dispatch(new actions.RemoveCreds({ dev: _this._developer, app: _this._app, creds: creds }));
            }
        });
    };
    TeleportDevPortalAppCredentialsComponent.prototype.apiKeyInputFocus = function (event) {
        event.target.type = "text";
        event.target.select();
    };
    TeleportDevPortalAppCredentialsComponent.prototype.apiKeyInputBlur = function (event) {
        event.target.type = "password";
    };
    TeleportDevPortalAppCredentialsComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-app-credentials",
                    templateUrl: "apps.credentials.html",
                },] },
    ];
    TeleportDevPortalAppCredentialsComponent.ctorParameters = function () { return [
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: ReducerManagerDispatcher, decorators: [{ type: Inject, args: [ReducerManagerDispatcher,] },] },
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
    ]; };
    TeleportDevPortalAppCredentialsComponent.propDecorators = {
        'app': [{ type: Input },],
    };
    return TeleportDevPortalAppCredentialsComponent;
}());
export { TeleportDevPortalAppCredentialsComponent };
//# sourceMappingURL=apps.credentials.component.js.map