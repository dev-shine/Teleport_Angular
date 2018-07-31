import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/first";
import { Store } from "@ngrx/store";
import { session } from "teleport-module-services/services/ngrx";
import { LoginService } from "teleport-module-services/services/services/login/login.service";
import { MessageService } from "../../services/message.service";
import PasswordUtil from "../../utils/PasswordUtil";
import { EmailValidator } from "../../utils/EmailValidator";
import { TeleportLoaderService } from "teleport-module-loader";
var TeleportDevPortalLoginComponent = (function () {
    function TeleportDevPortalLoginComponent(logins, messages, store$, loader) {
        this.logins = logins;
        this.messages = messages;
        this.store$ = store$;
        this.loader = loader;
        this.userName = "";
        this.passWord = "";
        this.userLogins = new BehaviorSubject([]);
    }
    TeleportDevPortalLoginComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil.satisfies(pw);
    };
    TeleportDevPortalLoginComponent.prototype.isEmailValid = function (email) {
        return EmailValidator.isValid(email);
    };
    TeleportDevPortalLoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loader.show("Looking for your accounts...");
        this.logins.login({ userName: this.userName, password: this.passWord })
            .first()
            .subscribe(function (res) {
            if (res.v1.length === 1) {
                _this.loginAs(res.v1[0]);
                return;
            }
            _this.userLogins.next(res.v1);
            _this.loader.hide();
        }, function (err) {
            _this.userLogins.next([]);
            _this.loader.hide();
            _this.messages.error("Login Failure", "The username/password combination was not provided.", err);
        });
    };
    TeleportDevPortalLoginComponent.prototype.loginAs = function (req) {
        var _this = this;
        this.loader.show("Please wait while you're logged in...");
        this.logins.loginAs(req)
            .first()
            .subscribe(function (res) {
            _this.messages.info("Welcome, " + res.userData.firstName + ".", "You are now logged in to your account.");
            _this.store$.dispatch(new session.actions.LoginAsSuccess(res));
        }, function (err) {
            _this.loader.hide();
            _this.closeMultiLogin();
            _this.messages.error("Login Failure", "The selected user failed to authenticate.", err);
        });
    };
    TeleportDevPortalLoginComponent.prototype.closeMultiLogin = function () {
        this.userLogins.next([]);
    };
    TeleportDevPortalLoginComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-login",
                    templateUrl: "login.html",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    TeleportDevPortalLoginComponent.ctorParameters = function () { return [
        { type: LoginService, decorators: [{ type: Inject, args: [LoginService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: TeleportLoaderService, decorators: [{ type: Inject, args: [TeleportLoaderService,] },] },
    ]; };
    return TeleportDevPortalLoginComponent;
}());
export { TeleportDevPortalLoginComponent };
//# sourceMappingURL=login.component.js.map