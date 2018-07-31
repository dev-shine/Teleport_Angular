import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { Developer } from "teleport-module-services/services/v1/models/Developer";
import { UserService } from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
import { ModalService } from "../../../services/modal.service";
import { EmailValidator } from "../../../utils/EmailValidator";
var TeleportDevPortalUserProfileComponent = (function () {
    function TeleportDevPortalUserProfileComponent(router, users, modal, messages, store$) {
        this.router = router;
        this.users = users;
        this.modal = modal;
        this.messages = messages;
        this.store$ = store$;
        this.isBusy = false;
        this.isEditProfile = false;
        this.isChangePassword = false;
    }
    TeleportDevPortalUserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store$.select("session")
            .filter(function (s) { return s.isJust(); })
            .map(function (s) { return s.just().userData; })
            .subscribe(function (dev) {
            var user = new Developer(dev).toJSON().portalUser;
            if (user === undefined) {
                throw new ReferenceError("The PortalUser was undefined on the Developer object.");
            }
            _this._user = user;
            if (!_this.isEditProfile) {
                _this.User = Object.assign({}, _this._user);
                console.log(_this.User);
            }
        });
    };
    TeleportDevPortalUserProfileComponent.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        delete this.User;
        delete this._user;
    };
    TeleportDevPortalUserProfileComponent.prototype.onStartEditMode = function () {
        this.isEditProfile = true;
        this.User = Object.assign({}, this._user);
    };
    TeleportDevPortalUserProfileComponent.prototype.closePasswordForm = function () {
        this.isChangePassword = false;
    };
    TeleportDevPortalUserProfileComponent.prototype.isEmailValid = function (email) {
        return EmailValidator.isValid(email);
    };
    TeleportDevPortalUserProfileComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isBusy = true;
        this.users.update(this.User)
            .then(function () {
            _this.messages.info("User Account Updated", "The changes to your user account were successfully saved.");
            _this.isBusy = false;
            _this.isEditProfile = false;
        })
            .catch(function (err) {
            _this.messages.error("User Account Update Failure", err.message, err);
            _this.isBusy = false;
        });
    };
    TeleportDevPortalUserProfileComponent.prototype.onDelete = function () {
        var _this = this;
        this.modal.show("Delete My User Account", "<p>Clicking OK will delete your user account. This will not affect the main account or its applications.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.users.remove(_this._user)
                    .then(function () {
                    _this.messages.warning("User Account Deleted", "Your user account has been deleted.");
                    return _this.router.navigateByUrl("/logout");
                })
                    .catch(function (err) {
                    _this.isBusy = false;
                    _this.messages.error("Delete Account Failure", err.message, err);
                });
            }
        });
    };
    TeleportDevPortalUserProfileComponent.prototype.onCancel = function () {
        this.isBusy = false;
        this.isEditProfile = false;
        this.User = Object.assign({}, this._user);
    };
    TeleportDevPortalUserProfileComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-user-profile",
                    templateUrl: "profile.user.html",
                },] },
    ];
    TeleportDevPortalUserProfileComponent.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: UserService, decorators: [{ type: Inject, args: [UserService,] },] },
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return TeleportDevPortalUserProfileComponent;
}());
export { TeleportDevPortalUserProfileComponent };
//# sourceMappingURL=profile.user.component.js.map