import { Component, Inject } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import "rxjs/add/operator/filter";
import { Store } from "@ngrx/store";
import { MessageService } from "../../../services/message.service";
import { UsageService } from "../../../services/usage.service";
import { TeleportLoaderService } from "teleport-module-loader";
var FIND_APPID_IN_URL = /^\/v1\/applications\/([a-z0-9\-]+)\/history\/usage/;
var TeleportDevPortalDataUsageComponent = (function () {
    function TeleportDevPortalDataUsageComponent(usage, messages, router, location, store$, loader) {
        this.usage = usage;
        this.messages = messages;
        this.router = router;
        this.location = location;
        this.store$ = store$;
        this.loader = loader;
    }
    TeleportDevPortalDataUsageComponent.prototype.getQueryFromUrl = function () {
        var params = this.router.parseUrl(this.router.url).queryParams;
        var appId = this.router.url.match(FIND_APPID_IN_URL)[1];
        var filters = {
            beginDate: params.beginDate,
            endDate: params.endDate,
            appId: params.appId || appId || "",
        };
        return [filters];
    };
    TeleportDevPortalDataUsageComponent.prototype.setQueryOnUrl = function () {
        this.location.replaceState(window.location.pathname, "beginDate=" + encodeURIComponent(this.filters.beginDate) + "&endDate=" + encodeURIComponent(this.filters.endDate) + "&appId=" + this.filters.appId);
    };
    TeleportDevPortalDataUsageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filters = this.getQueryFromUrl()[0];
        this.loader.show("Looking up your usage...");
        this._subscription = this.store$.select("v1_applications").subscribe(function (apps) { return _this._apps = apps; });
        setImmediate(function () { return _this.loadUsage(); });
    };
    TeleportDevPortalDataUsageComponent.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        delete this._usage;
        delete this._apps;
    };
    Object.defineProperty(TeleportDevPortalDataUsageComponent.prototype, "Usage", {
        get: function () {
            return this._usage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalDataUsageComponent.prototype, "Apps", {
        get: function () {
            return this._apps || [];
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalDataUsageComponent.prototype.loadUsage = function () {
        var _this = this;
        try {
            var _a = this.getNowAndFirst(), now = _a[0], first = _a[1];
            var req = {
                beginDate: this.filters.beginDate ? new Date(this.filters.beginDate) : first,
                endDate: this.filters.endDate ? new Date(this.filters.endDate) : now,
                appId: this.filters.appId || "",
            };
            if (isNaN(req.beginDate.getTime()) || isNaN(req.endDate.getTime())) {
                this.messages.error("Usage Failure", "The Begin and/or End Dates are invalid.");
                return;
            }
            if (req.beginDate >= req.endDate) {
                this.messages.error("Usage Failure", "The Begin Date cannot be later than the End Date.");
                return;
            }
            if (req.endDate.getTime() - req.beginDate.getTime() > 1000 * 60 * 60 * 24 * 31) {
                this.messages.error("Usage Failure", "The Begin Date and End Date cannot span more that a month.");
                return;
            }
            this.loader.show("Looking up your usage...");
            this.usage.pullUsage(req)
                .then(function (u) {
                _this.loader.hide();
                _this.filters.beginDate = new Date(u.beginDate).toLocaleString();
                _this.filters.endDate = new Date(u.endDate).toLocaleString();
                _this._usage = _this.transformUsage(u.usage);
                _this.setQueryOnUrl();
            })
                .catch(function (err) {
                _this.loader.hide();
                _this.messages.error("Usage Failure", err.message, err);
            });
        }
        catch (err) {
            console.error(err);
            this.loader.hide();
            this.messages.error("Usage Failure", err.message, err);
        }
    };
    TeleportDevPortalDataUsageComponent.prototype.transformUsage = function (usage) {
        var usageView = [{
                type: "total",
                description: "",
                quantity: 0,
                average: 0,
                total: 0,
            }];
        usage.sort(function (a, b) { return a.service_label.localeCompare(b.service_label); })
            .forEach(function (service) {
            usageView[0].quantity += service.quantity;
            usageView[0].total += service.price_total;
            usageView.push({
                type: "service",
                description: service.service_label,
                quantity: service.quantity,
                average: service.price_total / service.quantity,
                total: service.price_total,
            });
            service.locations.sort(function (a, b) { return a.country_label.localeCompare(b.country_label); })
                .forEach(function (location) {
                usageView.push({
                    type: "location",
                    description: location.country_label,
                    quantity: location.quantity,
                    average: location.price_total / location.quantity,
                    total: location.price_total,
                });
                location.items.sort(function (a, b) { return a.label.localeCompare(b.label); })
                    .forEach(function (item) {
                    usageView.push({
                        type: "item",
                        description: item.label,
                        quantity: item.quantity,
                        average: item.price_total / item.quantity,
                        total: item.price_total,
                    });
                });
            });
        });
        usageView[0].average = usageView[0].quantity ? usageView[0].total / usageView[0].quantity : 0;
        return usageView;
    };
    TeleportDevPortalDataUsageComponent.prototype.getNowAndFirst = function () {
        var now = new Date();
        var first = new Date();
        first.setDate(1);
        first.setHours(0, 0, 0, 0);
        return [now, first];
    };
    TeleportDevPortalDataUsageComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-data-usage",
                    templateUrl: "data.usage.html",
                },] },
    ];
    TeleportDevPortalDataUsageComponent.ctorParameters = function () { return [
        { type: UsageService, decorators: [{ type: Inject, args: [UsageService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: Location, decorators: [{ type: Inject, args: [Location,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: TeleportLoaderService, decorators: [{ type: Inject, args: [TeleportLoaderService,] },] },
    ]; };
    return TeleportDevPortalDataUsageComponent;
}());
export { TeleportDevPortalDataUsageComponent };
//# sourceMappingURL=data.usage.component.js.map