import { Component, Inject, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { BillingService } from "../../../services/billing.service";
import { MessageService } from "../../../services/message.service";
import { ModalService } from "../../../services/modal.service";
import { TeleportLoaderService } from "teleport-module-loader";
var TeleportDevPortalBillingPaymentComponent = (function () {
    function TeleportDevPortalBillingPaymentComponent(router, billing, messages, modal, zone, loader) {
        this.router = router;
        this.billing = billing;
        this.messages = messages;
        this.modal = modal;
        this.zone = zone;
        this.loader = loader;
        this.isReady = false;
        this.amount = 10;
    }
    TeleportDevPortalBillingPaymentComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.isReady = false;
        this.amount = 10;
        this.billing.getBraintreeClientToken()
            .then(function (token) {
            braintree.setup(token, "dropin", {
                container: "dropin-container",
                form: "paymentForm",
                onReady: function (integration) {
                    _this._checkout = integration;
                    _this.zone.run(function () { return _this.isReady = true; });
                },
                onPaymentMethodReceived: function (obj) {
                    _this.zone.run(function () {
                        _this.modal.show("Make a Payment", "<p>You are about to charge <strong>$" + _this.amount + "</strong> to your " + obj.type + ".</p>", { type: "confirm" })
                            .then(function (result) {
                            if (result) {
                                if (obj.type === "CreditCard") {
                                    _this.onSubmit(obj.nonce, obj.type, obj.details.cardType, obj.details.lastTwo);
                                }
                                else {
                                    _this.onSubmit(obj.nonce, obj.type, obj.details.email, "");
                                }
                            }
                        });
                    });
                },
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    TeleportDevPortalBillingPaymentComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this._checkout) {
            this._checkout.teardown(function () { return _this._checkout = null; });
        }
    };
    TeleportDevPortalBillingPaymentComponent.prototype.onCancel = function () {
        this.router.navigate(["/v1/account/payments"]).catch(function (err) { return console.error(err); });
    };
    TeleportDevPortalBillingPaymentComponent.prototype.onSubmit = function (nonce, method, type, lastFour) {
        var _this = this;
        if (!parseFloat(String(this.amount))) {
            this.messages.warning("Payment Failure", "The amount entered must be a valid number.");
            return;
        }
        this.loader.show("Please wait while your payment is applied...");
        this.billing.makePayment(this.amount, nonce, method, type, lastFour)
            .then(function () {
            _this.messages.info("Payment Accepted!", "A payment of $" + _this.amount + " was credited to your account.");
            _this.loader.hide();
            return _this.router.navigate(["/v1/account/payments"]);
        })
            .catch(function (err) {
            _this.messages.warning("Payment Failure", err.message, err);
            _this.loader.hide();
        });
    };
    TeleportDevPortalBillingPaymentComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-billing-payment",
                    templateUrl: "billing.payment.html",
                },] },
    ];
    TeleportDevPortalBillingPaymentComponent.ctorParameters = function () { return [
        { type: Router, decorators: [{ type: Inject, args: [Router,] },] },
        { type: BillingService, decorators: [{ type: Inject, args: [BillingService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
        { type: NgZone, decorators: [{ type: Inject, args: [NgZone,] },] },
        { type: TeleportLoaderService, decorators: [{ type: Inject, args: [TeleportLoaderService,] },] },
    ]; };
    return TeleportDevPortalBillingPaymentComponent;
}());
export { TeleportDevPortalBillingPaymentComponent };
//# sourceMappingURL=billing.payment.component.js.map