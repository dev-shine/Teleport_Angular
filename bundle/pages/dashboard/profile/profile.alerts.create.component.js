import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { AlertsService } from "../../../services/alerts.service";
var TeleportDevPortalProfileAlertsCreateComponent = (function () {
    function TeleportDevPortalProfileAlertsCreateComponent(router, alerts) {
        this.router = router;
        this.alerts = alerts;
        this.Alert = null;
        this.is = {
            MinToZero: true,
            Threshold1: true,
            Threshold2: false,
            Threshold3: false,
        };
        this._isBusy = false;
    }
    TeleportDevPortalProfileAlertsCreateComponent.prototype.ngOnInit = function () {
        this._isBusy = false;
        this.Alert = {
            id: 0,
            firstname: "",
            lastname: "",
            email: "",
            phone_no: "",
            send_receipt_on_payment: false,
            notify_on_app_payment: false,
            account_balance: {
                minutes_before_zero: 30,
                thresholds: [],
                threshold1: 10,
                threshold2: 100,
                threshold3: 1000,
            },
        };
    };
    Object.defineProperty(TeleportDevPortalProfileAlertsCreateComponent.prototype, "isBusy", {
        get: function () {
            return this._isBusy;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalProfileAlertsCreateComponent.prototype.isMinToZeroValid = function () {
        if (this.is.MinToZero) {
            return this.Alert.account_balance.minutes_before_zero >= 10 && this.Alert.account_balance.minutes_before_zero <= 1440;
        }
        return true;
    };
    TeleportDevPortalProfileAlertsCreateComponent.prototype.isThresholdValid = function (v) {
        if (this.is["Threshold" + v]) {
            var val = this.Alert.account_balance["threshold" + v];
            return !!val && val >= 10 && val <= 10000;
        }
        return true;
    };
    TeleportDevPortalProfileAlertsCreateComponent.prototype.isFormValid = function () {
        return (+(this.Alert.send_receipt_on_payment) +
            +(this.is.Threshold1 && this.isThresholdValid(1)) +
            +(this.is.Threshold2 && this.isThresholdValid(2)) +
            +(this.is.Threshold3 && this.isThresholdValid(3)) +
            +(this.is.MinToZero && this.isMinToZeroValid())) > 0;
    };
    TeleportDevPortalProfileAlertsCreateComponent.prototype.onSubmit = function () {
        var _this = this;
        this._isBusy = true;
        this.Alert.account_balance.minutes_before_zero = this.is.MinToZero ? this.Alert.account_balance.minutes_before_zero : undefined;
        this.Alert.account_balance.thresholds = [
            this.is.Threshold1 ? this.Alert.account_balance.threshold1 : undefined,
            this.is.Threshold2 ? this.Alert.account_balance.threshold2 : undefined,
            this.is.Threshold3 ? this.Alert.account_balance.threshold3 : undefined,
        ].filter(function (t) { return !!+t; });
        this.alerts.add(this.Alert)
            .then(function () { return _this.router.navigate(["/v1/account/alerts"]); })
            .catch(function () { return _this._isBusy = false; });
    };
    TeleportDevPortalProfileAlertsCreateComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-alerts-create",
                    templateUrl: "profile.alerts.create.html",
                },] },
    ];
    TeleportDevPortalProfileAlertsCreateComponent.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: AlertsService, decorators: [{ type: Inject, args: [AlertsService,] },] },
    ]; };
    return TeleportDevPortalProfileAlertsCreateComponent;
}());
export { TeleportDevPortalProfileAlertsCreateComponent };
//# sourceMappingURL=profile.alerts.create.component.js.map