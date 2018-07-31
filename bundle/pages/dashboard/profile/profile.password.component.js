import { Component, Inject, Output, EventEmitter, Input } from "@angular/core";
import "rxjs/add/operator/first";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import * as actions from "teleport-module-services/services/v1/ngrx/account/account.actions";
import { UserService } from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
import PasswordUtil from "../../../utils/PasswordUtil";
var TeleportDevPortalProfilePasswordComponent = (function () {
    function TeleportDevPortalProfilePasswordComponent(store$, dispatcher, messages) {
        this.store$ = store$;
        this.dispatcher = dispatcher;
        this.messages = messages;
        this.onComplete = new EventEmitter();
        this.isBusy = false;
        this.password = "";
        this.newPassword = "";
        this.newPasswordVerify = "";
    }
    TeleportDevPortalProfilePasswordComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil.satisfies(pw);
    };
    TeleportDevPortalProfilePasswordComponent.prototype.passwordsMatch = function () {
        return this.newPassword === this.newPasswordVerify;
    };
    TeleportDevPortalProfilePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.newPassword || !this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }
        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }
        if (this.password === this.newPassword) {
            this.messages.warning("Invalid Passwords", "The new password is the same as your current password.");
            return;
        }
        if (!PasswordUtil.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "The password that is at least 8 characters of caps, lowercase, numbers and special characters.");
            return;
        }
        this.isBusy = true;
        this.store$.dispatch(new actions.UpdatePassword({ dev: null, password: this.password, newPassword: this.newPassword }));
        this.dispatcher
            .first(function (action) { return action.type === actions.UPDATE_PASSWORD_SUCCESS || action.type === actions.UPDATE_PASSWORD_FAILURE; })
            .subscribe(function (action) {
            switch (action.type) {
                case actions.UPDATE_PASSWORD_SUCCESS:
                    _this.messages.info("Password Change Success", "Your password has been updated.");
                    _this.onComplete.emit();
                    break;
                default:
                    _this.messages.error("Password Change Failure", "Your password could not be updated.");
                    _this.isBusy = false;
            }
        });
    };
    TeleportDevPortalProfilePasswordComponent.prototype.onCancel = function () {
        this.isBusy = false;
        this.onComplete.emit();
    };
    TeleportDevPortalProfilePasswordComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-profile-password",
                    templateUrl: "profile.password.html",
                },] },
    ];
    TeleportDevPortalProfilePasswordComponent.ctorParameters = function () { return [
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: ReducerManagerDispatcher, decorators: [{ type: Inject, args: [ReducerManagerDispatcher,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
    ]; };
    TeleportDevPortalProfilePasswordComponent.propDecorators = {
        'onComplete': [{ type: Output },],
    };
    return TeleportDevPortalProfilePasswordComponent;
}());
export { TeleportDevPortalProfilePasswordComponent };
var TeleportDevPortalUserProfilePasswordComponent = (function () {
    function TeleportDevPortalUserProfilePasswordComponent(users, messages) {
        this.users = users;
        this.messages = messages;
        this.isBusy = false;
        this.password = "";
        this.newPassword = "";
        this.newPasswordVerify = "";
        this.onComplete = new EventEmitter();
    }
    TeleportDevPortalUserProfilePasswordComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil.satisfies(pw);
    };
    TeleportDevPortalUserProfilePasswordComponent.prototype.passwordsMatch = function () {
        return this.newPassword === this.newPasswordVerify;
    };
    TeleportDevPortalUserProfilePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.newPassword || !this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }
        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }
        if (this.password === this.newPassword) {
            this.messages.warning("Invalid Passwords", "The new password is the same as your current password.");
            return;
        }
        if (!PasswordUtil.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "The password that is at least 8 characters of caps, lowercase, numbers and special characters.");
            return;
        }
        this.isBusy = true;
        this.users.updatePassword(this.user, this.password, this.newPassword)
            .then(function () {
            _this.messages.info("Password Change Success", "Your password has been updated.");
            _this.onComplete.emit();
        })
            .catch(function (err) {
            _this.messages.error("Password Change Failure", err.message, err);
            _this.isBusy = false;
        });
    };
    TeleportDevPortalUserProfilePasswordComponent.prototype.onCancel = function () {
        this.isBusy = false;
        this.onComplete.emit();
    };
    TeleportDevPortalUserProfilePasswordComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-user-profile-password",
                    templateUrl: "profile.password.html",
                },] },
    ];
    TeleportDevPortalUserProfilePasswordComponent.ctorParameters = function () { return [
        { type: UserService, decorators: [{ type: Inject, args: [UserService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
    ]; };
    TeleportDevPortalUserProfilePasswordComponent.propDecorators = {
        'user': [{ type: Input, args: ["user",] },],
        'onComplete': [{ type: Output },],
    };
    return TeleportDevPortalUserProfilePasswordComponent;
}());
export { TeleportDevPortalUserProfilePasswordComponent };
//# sourceMappingURL=profile.password.component.js.map