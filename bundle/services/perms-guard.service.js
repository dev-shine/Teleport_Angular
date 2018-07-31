import { Injectable, Inject } from "@angular/core";
import { Router, } from "@angular/router";
import { Store } from "@ngrx/store";
import { validate } from "../utils/Permissions";
var PermsGuardCanActivate = (function () {
    function PermsGuardCanActivate(router, store$) {
        this.router = router;
        this.store$ = store$;
    }
    PermsGuardCanActivate.prototype.canActivateChild = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store$.select("session")
                .first(function (s) { return s.isJust(); })
                .map(function (s) { return s.just().userData; })
                .subscribe(function (dev) {
                var routeData = route.data;
                if (routeData.perms && !validate(dev.permissions, routeData.perms.reduce(function (p, c) { return (p[c] = true) && p; }, {}))) {
                    _this.router.navigate(["/v1/access-denied"], { queryParams: { perms: routeData.perms.join("|") } })
                        .then(function () { return resolve(false); })
                        .catch(function (err) { return reject(err); });
                }
                return resolve(true);
            });
        });
    };
    PermsGuardCanActivate.decorators = [
        { type: Injectable },
    ];
    PermsGuardCanActivate.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return PermsGuardCanActivate;
}());
export { PermsGuardCanActivate };
//# sourceMappingURL=perms-guard.service.js.map