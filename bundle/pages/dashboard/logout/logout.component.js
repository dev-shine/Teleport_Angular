import { Component, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as actions from "teleport-module-services/services/ngrx/login/login.actions";
var TeleportDevPortalLogoutComponent = (function () {
    function TeleportDevPortalLogoutComponent(store$) {
        this.store$ = store$;
    }
    TeleportDevPortalLogoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.store$.dispatch(new actions.Logout()); }, 1000);
    };
    TeleportDevPortalLogoutComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-logout",
                    templateUrl: "logout.html",
                },] },
    ];
    TeleportDevPortalLogoutComponent.ctorParameters = function () { return [
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return TeleportDevPortalLogoutComponent;
}());
export { TeleportDevPortalLogoutComponent };
//# sourceMappingURL=logout.component.js.map