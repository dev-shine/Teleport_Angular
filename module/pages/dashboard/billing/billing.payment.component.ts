
import { Component, Inject, AfterViewInit, OnDestroy, NgZone } from "@angular/core";
import { Router }                                              from "@angular/router";

import { BillingService } from "../../../services/billing.service";
import { MessageService } from "../../../services/message.service";
import { ModalService }   from "../../../services/modal.service";

import { TeleportLoaderService } from "teleport-module-loader";

declare const braintree: any;


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-billing-payment",
    templateUrl: "billing.payment.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalBillingPaymentComponent implements AfterViewInit, OnDestroy {

    public isReady = false;
    public amount = 10;

    private _checkout: any;
    
    constructor (
        @Inject(Router)         private router: Router,
        @Inject(BillingService) private billing: BillingService,
        @Inject(MessageService) private messages: MessageService,
        @Inject(ModalService)  private modal: ModalService,
        @Inject(NgZone)         private zone: NgZone,
        @Inject(TeleportLoaderService) private loader: TeleportLoaderService,
    ) {}

    public ngAfterViewInit () {

        this.isReady = false;
        this.amount = 10;

        this.billing.getBraintreeClientToken()
            .then(token => {

                braintree.setup(token, "dropin", {
                    container: "dropin-container",
                    form: "paymentForm",
                    onReady: (integration: any) => {
                        this._checkout = integration;
                        this.zone.run(() => this.isReady = true);
                    },
                    onPaymentMethodReceived: (obj: any) => {

                        this.zone.run(() => {

                            this.modal.show("Make a Payment", `<p>You are about to charge <strong>$${this.amount}</strong> to your ${obj.type}.</p>`, { type: "confirm" })
                                .then(result => {
                                    if (result) {
                                        if (obj.type === "CreditCard") {
                                            this.onSubmit(obj.nonce, obj.type, obj.details.cardType, obj.details.lastTwo);
                                        } else { // PayPal
                                            this.onSubmit(obj.nonce, obj.type, obj.details.email, "");
                                        }
                                    }
                                });
                        });
                    },
                });
            })
            .catch(err => console.log(err));
    }

    public ngOnDestroy () {
        if (this._checkout) {
            this._checkout.teardown((): any => this._checkout = null);
        }
    }

    public onCancel () {
        this.router.navigate(["/v1/account/payments"]).catch(err => console.error(err));
    }

    public onSubmit (nonce: string, method: string, type: string, lastFour: string) {

        if (! parseFloat(String(this.amount))) {
            this.messages.warning("Payment Failure", "The amount entered must be a valid number.");
            return;
        }

        this.loader.show("Please wait while your payment is applied...");

        this.billing.makePayment(this.amount, nonce, method, type, lastFour)
            .then(() => {
                this.messages.info("Payment Accepted!", `A payment of $${this.amount} was credited to your account.`);
                this.loader.hide();
                return this.router.navigate(["/v1/account/payments"]);
            })
            .catch(err => {
                this.messages.warning("Payment Failure", err.message, err);
                this.loader.hide();
            });
    }
}
