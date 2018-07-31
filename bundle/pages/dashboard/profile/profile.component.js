import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeUntil";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import { Developer } from "teleport-module-services/services/v1/models/Developer";
import * as actions from "teleport-module-services/services/v1/ngrx/account/account.actions";
import { MessageService } from "../../../services/message.service";
import { ModalService } from "../../../services/modal.service";
import { EmailValidator } from "../../../utils/EmailValidator";
var TeleportDevPortalProfileComponent = (function () {
    function TeleportDevPortalProfileComponent(router, modal, messages, store$, dispatcher) {
        this.router = router;
        this.modal = modal;
        this.messages = messages;
        this.store$ = store$;
        this.dispatcher = dispatcher;
        this.isBusy = false;
        this.isEditProfile = false;
        this.isChangePassword = false;
        this.unsubscriber = new Subject();
    }
    TeleportDevPortalProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store$.select("session")
            .takeUntil(this.unsubscriber)
            .filter(function (s) { return s.isJust(); })
            .map(function (s) { return s.just().userData; })
            .subscribe(function (dev) {
            if (dev.portalUser) {
                _this.router.navigateByUrl("/v1/account/user");
                return;
            }
            _this._developer = new Developer(dev).toJSON();
            if (!_this.isEditProfile) {
                _this.Developer = Object.assign({}, _this._developer);
                console.log(_this.Developer);
            }
        });
        var OK_ACTIONS = [
            actions.UPDATE, actions.UPDATE_SUCCESS, actions.UPDATE_FAILURE,
            actions.REMOVE, actions.REMOVE_SUCCESS, actions.REMOVE_FAILURE,
        ];
        this.dispatcher
            .takeUntil(this.unsubscriber)
            .filter(function (action) { return OK_ACTIONS.indexOf(action.type) !== -1; })
            .subscribe(function (action) {
            switch (action.type) {
                case actions.UPDATE:
                case actions.REMOVE:
                    _this.isBusy = true;
                    break;
                case actions.UPDATE_SUCCESS:
                    _this.messages.info("Account Updated", "The changes to your account were successfully saved.");
                    _this.isBusy = false;
                    _this.isEditProfile = false;
                    break;
                case actions.REMOVE_SUCCESS:
                    _this.messages.warning("Account Deleted", "Your account has been deleted.");
                    _this.router.navigateByUrl("/logout");
                    break;
                default:
                    _this.isEditProfile = false;
                    _this.isBusy = false;
            }
        });
    };
    TeleportDevPortalProfileComponent.prototype.ngOnDestroy = function () {
        this.unsubscriber.complete();
        delete this.Developer;
        delete this._developer;
    };
    TeleportDevPortalProfileComponent.prototype.onStartEditMode = function () {
        this.isEditProfile = true;
        this.Developer = Object.assign({}, this._developer);
    };
    TeleportDevPortalProfileComponent.prototype.closePasswordForm = function () {
        this.isChangePassword = false;
    };
    TeleportDevPortalProfileComponent.prototype.isEmailValid = function (email) {
        return EmailValidator.isValid(email);
    };
    TeleportDevPortalProfileComponent.prototype.onSubmit = function () {
        this.store$.dispatch(new actions.Update({ dev: this.Developer }));
    };
    TeleportDevPortalProfileComponent.prototype.onDelete = function () {
        var _this = this;
        this.modal.show("Delete My Account", "<p>Clicking OK will delete your account. All applications under this account will stop working. All phone numbers will be released.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.store$.dispatch(new actions.Remove({ dev: _this._developer }));
            }
        });
    };
    TeleportDevPortalProfileComponent.prototype.onCancel = function () {
        this.isBusy = false;
        this.isEditProfile = false;
        this.Developer = Object.assign({}, this._developer);
    };
    TeleportDevPortalProfileComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-profile",
                    templateUrl: "profile.html",
                },] },
    ];
    TeleportDevPortalProfileComponent.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: ReducerManagerDispatcher, decorators: [{ type: Inject, args: [ReducerManagerDispatcher,] },] },
    ]; };
    return TeleportDevPortalProfileComponent;
}());
export { TeleportDevPortalProfileComponent };
//# sourceMappingURL=profile.component.js.map