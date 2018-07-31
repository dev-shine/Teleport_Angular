import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { UserService } from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";
import { EmailValidator } from "../../../../utils/EmailValidator";
import * as Permissions from "../../../../utils/Permissions";
var TeleportDevPortalUserCreateComponent = (function () {
    function TeleportDevPortalUserCreateComponent(router, users, messages, store$) {
        this.router = router;
        this.users = users;
        this.messages = messages;
        this.store$ = store$;
        this.isBusy = false;
        this.isSendInvite = true;
    }
    TeleportDevPortalUserCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just().userData; })
            .subscribe(function (dev) {
            _this._developer = dev;
            if (Permissions.validate(dev.permissions, { "account.users.create": true })) {
                _this.User = {
                    id: 0,
                    developerId: "",
                    createdOn: new Date(),
                    status: "unverified",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36),
                    permissions: Object.assign({}, dev.permissions),
                    phoneNo: "",
                    position: "",
                    notes: "",
                };
                _this.isBusy = false;
            }
            else {
                return _this.router.navigate(["/v1/access-denied"], { queryParams: { perms: "account.users.create" } });
            }
        });
    };
    TeleportDevPortalUserCreateComponent.prototype.ngOnDestroy = function () {
        console.log("UIUserCreate Destroy");
        delete this._developer;
        delete this.User;
    };
    TeleportDevPortalUserCreateComponent.prototype.isEmailValid = function () {
        return EmailValidator.isValid(this.User.email);
    };
    TeleportDevPortalUserCreateComponent.prototype.isUserValid = function () {
        return this.isEmailValid() && Permissions.validate(this._developer.permissions, this.User.permissions);
    };
    TeleportDevPortalUserCreateComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.isUserValid()) {
            this.messages.warning("Invalid User", "As configured, this user is not valid.");
            return;
        }
        this.isBusy = true;
        this.users.create(this.User)
            .then(function (user) {
            _this.messages.info("User Created", "The new user was successfully created.");
            if (_this.isSendInvite) {
                _this.users.sendInvite(user);
                _this.messages.info("Email Invite Sent", "An email invitation has been sent to the user.");
            }
            _this.router.navigateByUrl("/v1/account/users").catch(function (err) { return console.error(err); });
        })
            .catch(function (err) {
            _this.isBusy = false;
            _this.messages.error("New User Failure", "An unexpected error prevented the user from being created. Try again or contact support.", err);
        });
    };
    TeleportDevPortalUserCreateComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-user-create",
                    templateUrl: "user.create.html",
                },] },
    ];
    TeleportDevPortalUserCreateComponent.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: UserService, decorators: [{ type: Inject, args: [UserService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return TeleportDevPortalUserCreateComponent;
}());
export { TeleportDevPortalUserCreateComponent };
//# sourceMappingURL=user.create.component.js.map