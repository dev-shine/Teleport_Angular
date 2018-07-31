import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { UserService } from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";
import { ModalService } from "../../../../services/modal.service";
import { EmailValidator } from "../../../../utils/EmailValidator";
import * as Permissions from "../../../../utils/Permissions";
var TeleportDevPortalUserUpdateComponent = (function () {
    function TeleportDevPortalUserUpdateComponent(router, route, users, messages, modal, store$) {
        this.router = router;
        this.route = route;
        this.users = users;
        this.messages = messages;
        this.modal = modal;
        this.store$ = store$;
        this.isBusy = false;
        this.isEditing = false;
    }
    TeleportDevPortalUserUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isBusy = true;
        var userId = parseInt(this.route.snapshot.params.userId, 10);
        console.log("UIUserUpdate Init", userId);
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just().userData; })
            .subscribe(function (dev) {
            _this._developer = dev;
            if (_this._developer.portalUser && _this._developer.portalUser.id === userId) {
                _this.messages.warning("That way madness lies!", "You cannot edit your own user here.");
                return _this.router.navigateByUrl("/v1/account/users");
            }
            if (["account.users.delete", "account.users.update"].some(function (p) {
                return Permissions.validate(dev.permissions, (_a = {}, _a[p] = true, _a));
                var _a;
            })) {
                _this.users.detail(userId)
                    .then(function (user) {
                    if (!Permissions.validate(dev.permissions, user.permissions)) {
                        _this.messages.warning("Your Permission Kung-Fu is Weak", "You do not have all the permissions required to edit this user.");
                        _this.router.navigateByUrl("/v1/account/users");
                        return;
                    }
                    _this._origUser = user;
                    _this._user = Object.assign({}, _this._origUser);
                    _this._user.permissions = Object.assign({}, _this._origUser.permissions);
                    _this.isBusy = false;
                })
                    .catch(function (err) {
                    _this.messages.error("Failed to Load User", err.message, err);
                    return _this.router.navigateByUrl("/v1/account/users");
                });
            }
            else {
                return _this.router.navigate(["/v1/access-denied"], { queryParams: { perms: "account.users.update account.users.delete" } });
            }
        });
    };
    TeleportDevPortalUserUpdateComponent.prototype.ngOnDestroy = function () {
        delete this._user;
    };
    Object.defineProperty(TeleportDevPortalUserUpdateComponent.prototype, "User", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalUserUpdateComponent.prototype.editUser = function () {
        this.isEditing = !!this._user;
    };
    TeleportDevPortalUserUpdateComponent.prototype.deleteUser = function () {
        var _this = this;
        this.modal.show("Delete User", "<p>Clicking OK will delete the user \"" + this.User.firstName + " " + this.User.lastName + "\".</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (isOk) {
            if (isOk) {
                _this.isBusy = true;
                _this.users.remove(_this._user)
                    .then(function () {
                    _this.messages.warning("User Deleted", "Alas, poor " + _this._user.firstName + "! I knew him, " + _this._developer.firstName + ".");
                    return _this.router.navigate(["/v1/account/users"]);
                })
                    .catch(function (err) {
                    _this.isBusy = false;
                    _this.messages.error("User Delete Failed", "The following error occurred: " + err.message + ".", err);
                });
            }
        });
    };
    TeleportDevPortalUserUpdateComponent.prototype.isEmailValid = function () {
        return EmailValidator.isValid(this.User.email);
    };
    TeleportDevPortalUserUpdateComponent.prototype.isUserValid = function () {
        return this.isEmailValid() && Permissions.validate(this._developer.permissions, this.User.permissions);
    };
    TeleportDevPortalUserUpdateComponent.prototype.saveChanges = function () {
        var _this = this;
        if (!this.isUserValid()) {
            this.messages.warning("Invalid User", "As configured, this user is not valid.");
            return;
        }
        this.isEditing = false;
        this.isBusy = true;
        this.users.update(this._user)
            .then(function (user) {
            _this._origUser = user;
            _this._user = Object.assign({}, _this._origUser);
            _this._user.permissions = Object.assign({}, _this._origUser.permissions);
            _this.isBusy = false;
            _this.messages.info("User Updated", "This user has been successfully updated.");
        })
            .catch(function (err) {
            _this.isBusy = false;
            _this.messages.error("User Update Failed", "The following error occurred: " + err.message + ".", err);
        });
    };
    TeleportDevPortalUserUpdateComponent.prototype.cancelChanges = function () {
        this.isEditing = false;
        this._user = Object.assign({}, this._origUser);
        this._user.permissions = Object.assign({}, this._origUser.permissions);
    };
    TeleportDevPortalUserUpdateComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-user-update",
                    templateUrl: "user.update.html",
                },] },
    ];
    TeleportDevPortalUserUpdateComponent.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: ActivatedRoute, decorators: [{ type: Inject, args: [ActivatedRoute,] },] },
        { type: UserService, decorators: [{ type: Inject, args: [UserService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return TeleportDevPortalUserUpdateComponent;
}());
export { TeleportDevPortalUserUpdateComponent };
//# sourceMappingURL=user.update.component.js.map