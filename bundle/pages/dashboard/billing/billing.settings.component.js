import { Component, Inject } from "@angular/core";
import { BillingService } from "../../../services/billing.service";
var TeleportDevPortalBillingSettingsComponent = (function () {
    function TeleportDevPortalBillingSettingsComponent(billing) {
        this.billing = billing;
    }
    TeleportDevPortalBillingSettingsComponent.prototype.ngAfterViewInit = function () {
        this.billing.getBraintreeClientToken()
            .then(function (token) {
            braintree.setup(token, "dropin", {
                container: "dropin-container",
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    TeleportDevPortalBillingSettingsComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-billing-settings",
                    templateUrl: "billing.settings.html",
                },] },
    ];
    TeleportDevPortalBillingSettingsComponent.ctorParameters = function () { return [
        { type: BillingService, decorators: [{ type: Inject, args: [BillingService,] },] },
    ]; };
    return TeleportDevPortalBillingSettingsComponent;
}());
export { TeleportDevPortalBillingSettingsComponent };
//# sourceMappingURL=billing.settings.component.js.map