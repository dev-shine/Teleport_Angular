import { Component, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import { LoginService } from "teleport-module-services/services/services/login/login.service";
import { MessageService } from "../../services/message.service";
import PasswordUtil from "../../utils/PasswordUtil";
import { EmailValidator } from "../../utils/EmailValidator";
import { TeleportLoaderService } from "teleport-module-loader";
var TeleportDevPortalRecoverPasswordComponent = (function () {
    function TeleportDevPortalRecoverPasswordComponent(route, logins, messages, loader) {
        this.route = route;
        this.logins = logins;
        this.messages = messages;
        this.loader = loader;
        this.isSuccess = false;
        this.email = "";
        this.newPassword = "";
        this.newPasswordVerify = "";
        this.isCaptchaOk = false;
        this.reCaptchaResponse = "";
    }
    TeleportDevPortalRecoverPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._resetCaptchaObservable = Observable.create(function (observer) { return _this._resetCaptchaObserver = observer; });
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.ngOnDestroy = function () {
        if (this._resetCaptchaObserver) {
            this._resetCaptchaObserver.complete();
        }
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil.satisfies(pw);
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.isEmailValid = function (email) {
        return EmailValidator.isValid(email);
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.passwordsMatch = function () {
        return this.newPassword === this.newPasswordVerify;
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.onCaptcha = function (token, val) {
        this.reCaptchaResponse = token;
        this.isCaptchaOk = val;
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.resetCaptchaObservable = function () {
        return this._resetCaptchaObservable;
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.newPassword || !this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }
        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }
        if (!PasswordUtil.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "Your password must be at least 8 characters and contain caps, lowercase, numbers and special characters.");
            return;
        }
        this.loader.show("Please wait...");
        var authKey = this.route.snapshot.params.key;
        this.logins.resetPassword({ email: this.email, password: this.newPassword, authKey: authKey, reCaptchaResponse: this.reCaptchaResponse })
            .toPromise()
            .then(function () {
            _this.isSuccess = true;
            _this.loader.hide();
        })
            .catch(function (err) {
            console.error("Recovery failure.", err);
            _this.isSuccess = false;
            _this.loader.hide();
            _this._resetCaptchaObserver.next(true);
            _this.messages.error("Recovery Failed", err.message, err);
        });
    };
    TeleportDevPortalRecoverPasswordComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-recover-password",
                    templateUrl: "recover.html",
                },] },
    ];
    TeleportDevPortalRecoverPasswordComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, decorators: [{ type: Inject, args: [ActivatedRoute,] },] },
        { type: LoginService, decorators: [{ type: Inject, args: [LoginService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: TeleportLoaderService, decorators: [{ type: Inject, args: [TeleportLoaderService,] },] },
    ]; };
    return TeleportDevPortalRecoverPasswordComponent;
}());
export { TeleportDevPortalRecoverPasswordComponent };
//# sourceMappingURL=recover.component.js.map