import { Component, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import { AccountService } from "teleport-module-services/services/v1/services/account/account.service";
import { MessageService } from "../../services/message.service";
import PasswordUtil from "../../utils/PasswordUtil";
import { EmailValidator } from "../../utils/EmailValidator";
var TeleportDevPortalRegisterComponent = (function () {
    function TeleportDevPortalRegisterComponent(account, messages) {
        this.account = account;
        this.messages = messages;
        this.form = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordVerify: "",
            phoneNo: "",
            company: "",
            interests: {},
            tc_agree: false,
            "g-recaptcha-response": "",
        };
        this.isSubmitted = false;
        this.isSuccess = false;
        this.isCaptchaOk = false;
    }
    TeleportDevPortalRegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._resetCaptchaObservable = Observable.create(function (observer) { return _this._resetCaptchaObserver = observer; });
    };
    TeleportDevPortalRegisterComponent.prototype.ngOnDestroy = function () {
        if (this._resetCaptchaObserver) {
            this._resetCaptchaObserver.complete();
        }
    };
    TeleportDevPortalRegisterComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil.satisfies(pw);
    };
    TeleportDevPortalRegisterComponent.prototype.isEmailValid = function (email) {
        return EmailValidator.isValid(email);
    };
    TeleportDevPortalRegisterComponent.prototype.passwordsMatch = function () {
        return this.form.password.length > 0 && this.form.password === this.form.passwordVerify;
    };
    TeleportDevPortalRegisterComponent.prototype.onCaptcha = function (token, val) {
        this.form["g-recaptcha-response"] = token;
        this.isCaptchaOk = val;
    };
    TeleportDevPortalRegisterComponent.prototype.resetCaptchaObservable = function () {
        return this._resetCaptchaObservable;
    };
    TeleportDevPortalRegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.form.password || !this.form.passwordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }
        if (this.form.password !== this.form.passwordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }
        if (!PasswordUtil.satisfies(this.form.password)) {
            this.messages.warning("Invalid Password", "Your password must be at least 8 characters and contain caps, lowercase, numbers and special characters.");
            return;
        }
        this.isSubmitted = true;
        this.account.create(this.form)
            .toPromise()
            .then(function (dev) {
            console.log("Registration Success", dev);
            _this.isSuccess = true;
            _this.isSubmitted = false;
        })
            .catch(function (err) {
            console.error("Registration failure.", err);
            _this.isSuccess = false;
            _this.isSubmitted = false;
            _this._resetCaptchaObserver.next(true);
            _this.messages.error("Registration Failed", err.message);
        });
    };
    TeleportDevPortalRegisterComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-register",
                    templateUrl: "register.html",
                },] },
    ];
    TeleportDevPortalRegisterComponent.ctorParameters = function () { return [
        { type: AccountService, decorators: [{ type: Inject, args: [AccountService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
    ]; };
    return TeleportDevPortalRegisterComponent;
}());
export { TeleportDevPortalRegisterComponent };
//# sourceMappingURL=register.component.js.map