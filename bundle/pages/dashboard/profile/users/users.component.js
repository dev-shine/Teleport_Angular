import { Component, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserService } from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";
import * as Permissions from "../../../../utils/Permissions";
var TeleportDevPortalUsersComponent = (function () {
    function TeleportDevPortalUsersComponent(users, messages, store$) {
        this.users = users;
        this.messages = messages;
        this.store$ = store$;
        this.isBusy = false;
    }
    TeleportDevPortalUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isBusy = true;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._developer = s.userData; });
        this.users.list()
            .then(function (users) {
            _this.isBusy = false;
            _this._users = users;
        })
            .catch(function (err) {
            console.error(err);
            _this.isBusy = false;
            _this.messages.error("Failed to Load User List", err.message, err);
        });
    };
    TeleportDevPortalUsersComponent.prototype.ngOnDestroy = function () {
        delete this._users;
    };
    Object.defineProperty(TeleportDevPortalUsersComponent.prototype, "Users", {
        get: function () {
            return this._users;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalUsersComponent.prototype.isEditable = function (user) {
        if (this._developer.portalUser && this._developer.portalUser.id === user.id) {
            return false;
        }
        return this._developer && Permissions.validate(this._developer.permissions, user.permissions);
    };
    TeleportDevPortalUsersComponent.prototype.resendInvite = function (user) {
        var _this = this;
        this.users.sendInvite(user)
            .then(function () {
            _this.messages.info("User Invite Resent", "Perhaps they'll get it this time.");
        })
            .catch(function (err) {
            _this.messages.error("User Invite Failed to Send", "An unexpected error prevented the invite from being sent. Try again.", err);
        });
    };
    TeleportDevPortalUsersComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-users",
                    templateUrl: "users.html",
                },] },
    ];
    TeleportDevPortalUsersComponent.ctorParameters = function () { return [
        { type: UserService, decorators: [{ type: Inject, args: [UserService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return TeleportDevPortalUsersComponent;
}());
export { TeleportDevPortalUsersComponent };
//# sourceMappingURL=users.component.js.map