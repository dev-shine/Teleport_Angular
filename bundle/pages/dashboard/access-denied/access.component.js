import { Component, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { validate } from "../../../utils/Permissions";
var TeleportDevPortalAccessDeniedComponent = (function () {
    function TeleportDevPortalAccessDeniedComponent(store$, route) {
        this.store$ = store$;
        this.route = route;
        this._reqPerms = [];
        this._devPerms = {};
    }
    TeleportDevPortalAccessDeniedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._reqPerms = (this.route.snapshot.queryParams.perms || "").split("|");
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this._devPerms = s.userData.permissions; });
    };
    TeleportDevPortalAccessDeniedComponent.prototype.ngOnDestroy = function () {
        this._reqPerms = [];
        this._devPerms = {};
    };
    Object.defineProperty(TeleportDevPortalAccessDeniedComponent.prototype, "RequiredPermissions", {
        get: function () {
            return this._reqPerms;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAccessDeniedComponent.prototype.hasPermission = function (perm) {
        return validate(this._devPerms, (_a = {}, _a[perm] = true, _a));
        var _a;
    };
    TeleportDevPortalAccessDeniedComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-access-denied",
                    templateUrl: "access.html",
                },] },
    ];
    TeleportDevPortalAccessDeniedComponent.ctorParameters = function () { return [
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: ActivatedRoute, decorators: [{ type: Inject, args: [ActivatedRoute,] },] },
    ]; };
    return TeleportDevPortalAccessDeniedComponent;
}());
export { TeleportDevPortalAccessDeniedComponent };
//# sourceMappingURL=access.component.js.map