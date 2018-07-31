import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import { LoginService } from "teleport-module-services/services/services/login/login.service";
import { MessageService } from "../../services/message.service";
import { EmailValidator } from "../../utils/EmailValidator";
import { TeleportLoaderService } from "teleport-module-loader";
var TeleportDevPortalForgotPasswordComponent = (function () {
    function TeleportDevPortalForgotPasswordComponent(router, logins, messages, loader) {
        var _this = this;
        this.router = router;
        this.logins = logins;
        this.messages = messages;
        this.loader = loader;
        this.userName = "";
        this.isCaptchaOk = false;
        this.reCaptchaResponse = "";
        this._resetCaptchaObservable = Observable.create(function (observer) { return _this._resetCaptchaObserver = observer; });
    }
    TeleportDevPortalForgotPasswordComponent.prototype.isEmailValid = function (email) {
        return EmailValidator.isValid(email);
    };
    TeleportDevPortalForgotPasswordComponent.prototype.onCaptcha = function (resp, isOk) {
        this.reCaptchaResponse = resp;
        this.isCaptchaOk = isOk;
    };
    TeleportDevPortalForgotPasswordComponent.prototype.resetCaptchaObservable = function () {
        return this._resetCaptchaObservable;
    };
    TeleportDevPortalForgotPasswordComponent.prototype.onRecoverPassword = function () {
        var _this = this;
        this.loader.show("Please wait...");
        this.logins.recoverPassword({ email: this.userName, reCaptchaResponse: this.reCaptchaResponse })
            .toPromise()
            .then(function (resp) {
            console.log("Password Recovery Success", resp);
            _this.loader.hide();
            _this.messages.info("Password Recovery Success", "An email will be sent with recovery instructions.");
            _this.router.navigateByUrl("/login").catch(function (err) { return console.error(err); });
        })
            .catch(function (err) {
            console.error("Password Recovery Failure", err);
            _this._resetCaptchaObserver.next(true);
            _this.loader.hide();
            _this.messages.error("Password Recovery Failure", err.message, err);
        });
    };
    TeleportDevPortalForgotPasswordComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-forgot-password",
                    templateUrl: "forgot.html",
                },] },
    ];
    TeleportDevPortalForgotPasswordComponent.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: LoginService, decorators: [{ type: Inject, args: [LoginService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: TeleportLoaderService, decorators: [{ type: Inject, args: [TeleportLoaderService,] },] },
    ]; };
    return TeleportDevPortalForgotPasswordComponent;
}());
export { TeleportDevPortalForgotPasswordComponent };
//# sourceMappingURL=forgot.component.js.map