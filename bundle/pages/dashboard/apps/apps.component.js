import { Component, Inject } from "@angular/core";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { Refresh } from "teleport-module-services/services/v1/ngrx/applications/applications.actions";
var TeleportDevPortalAppsComponent = (function () {
    function TeleportDevPortalAppsComponent(store$) {
        this.store$ = store$;
        this.sortBy = [this.sortByNameAsc];
        this.filterOn = "";
        this.showNum = 20;
        this._applications = [];
        this._isBusy = false;
    }
    TeleportDevPortalAppsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._isBusy = true;
        this.store$.select("session")
            .filter(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) { return _this.Developer = s.userData; });
        this.store$.select("v1_applications")
            .subscribe(function (apps) {
            _this._isBusy = false;
            _this._applications = apps;
        });
    };
    TeleportDevPortalAppsComponent.prototype.ngOnDestroy = function () {
        delete this.Developer;
        this._applications = [];
        this.sortBy = [this.sortByNameDesc, this.sortByNotesAsc, this.sortByNotesDesc, this.sortByCreatedOnAsc, this.sortByCreatedOnDesc];
    };
    Object.defineProperty(TeleportDevPortalAppsComponent.prototype, "isBusy", {
        get: function () {
            return this._isBusy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalAppsComponent.prototype, "totalApps", {
        get: function () {
            return this._applications.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalAppsComponent.prototype, "Applications", {
        get: function () {
            var _this = this;
            return this.sortBy
                .reduce(function (apps, s) { return apps.sort(s); }, this._applications.slice(0))
                .filter(function (app) { return ["friendlyName", "notes", "name"].some(function (param) { return app[param].toLowerCase().includes(_this.filterOn.toLowerCase()); }); })
                .slice(0, this.showNum);
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppsComponent.prototype.requestAppsRefresh = function () {
        this.store$.dispatch(new Refresh({ dev: this.Developer }));
    };
    TeleportDevPortalAppsComponent.prototype.hasSort = function (funcName) {
        return this.sortBy.indexOf(this[funcName]) !== -1;
    };
    TeleportDevPortalAppsComponent.prototype.toggleSort = function (param) {
        if (this.hasSort("sortBy" + param + "Asc")) {
            this.sortBy.splice(this.sortBy.indexOf(this["sortBy" + param + "Asc"]), 1);
            this.sortBy.push(this["sortBy" + param + "Desc"]);
        }
        else if (this.hasSort("sortBy" + param + "Desc")) {
            this.sortBy.splice(this.sortBy.indexOf(this["sortBy" + param + "Desc"]), 1);
        }
        else {
            this.sortBy.push(this["sortBy" + param + "Asc"]);
        }
    };
    TeleportDevPortalAppsComponent.prototype.sortByNameAsc = function (a, b) {
        return a.friendlyName.localeCompare(b.friendlyName);
    };
    TeleportDevPortalAppsComponent.prototype.sortByNameDesc = function (a, b) {
        return b.friendlyName.localeCompare(a.friendlyName);
    };
    TeleportDevPortalAppsComponent.prototype.sortByNotesAsc = function (a, b) {
        return a.notes.localeCompare(b.notes);
    };
    TeleportDevPortalAppsComponent.prototype.sortByNotesDesc = function (a, b) {
        return b.notes.localeCompare(a.notes);
    };
    TeleportDevPortalAppsComponent.prototype.sortByCreatedOnAsc = function (a, b) {
        return +a.createdAt - +b.createdAt;
    };
    TeleportDevPortalAppsComponent.prototype.sortByCreatedOnDesc = function (a, b) {
        return +b.createdAt - +a.createdAt;
    };
    TeleportDevPortalAppsComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-apps",
                    templateUrl: "apps.html",
                },] },
    ];
    TeleportDevPortalAppsComponent.ctorParameters = function () { return [
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return TeleportDevPortalAppsComponent;
}());
export { TeleportDevPortalAppsComponent };
//# sourceMappingURL=apps.component.js.map