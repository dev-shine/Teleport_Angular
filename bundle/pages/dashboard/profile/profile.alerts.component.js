import { Component, Inject } from "@angular/core";
import { AlertsService } from "../../../services/alerts.service";
import { ModalService } from "../../../services/modal.service";
var TeleportDevPortalProfileAlertsComponent = (function () {
    function TeleportDevPortalProfileAlertsComponent(alerts, modal) {
        this.alerts = alerts;
        this.modal = modal;
        this._alerts = [];
        this._isBusy = true;
    }
    TeleportDevPortalProfileAlertsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._isBusy = true;
        this._subscription = this.alerts.Observable
            .filter(function (a) { return !!a; })
            .subscribe(function (a) {
            _this._isBusy = false;
            _this._alerts = a;
        });
    };
    TeleportDevPortalProfileAlertsComponent.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._alerts = [];
    };
    Object.defineProperty(TeleportDevPortalProfileAlertsComponent.prototype, "Alerts", {
        get: function () {
            return this._alerts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalProfileAlertsComponent.prototype, "isBusy", {
        get: function () {
            return this._isBusy;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalProfileAlertsComponent.prototype.refresh = function () {
        this.alerts.refresh().catch(function (err) { return console.error(err); });
    };
    TeleportDevPortalProfileAlertsComponent.prototype.onDelete = function (alert) {
        var _this = this;
        this.modal.show("Delete Alert", "<p>Clicking OK will delete the " + alert.email + " alert.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this._alerts = _this._alerts.filter(function (a) { return a.id !== alert.id; });
                _this.alerts.remove(alert)
                    .catch(function () { return _this._alerts.push(alert); });
            }
        });
    };
    TeleportDevPortalProfileAlertsComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-alerts",
                    templateUrl: "profile.alerts.html",
                },] },
    ];
    TeleportDevPortalProfileAlertsComponent.ctorParameters = function () { return [
        { type: AlertsService, decorators: [{ type: Inject, args: [AlertsService,] },] },
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
    ]; };
    return TeleportDevPortalProfileAlertsComponent;
}());
export { TeleportDevPortalProfileAlertsComponent };
//# sourceMappingURL=profile.alerts.component.js.map