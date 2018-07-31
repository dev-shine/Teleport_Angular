
import { Component, Inject, AfterViewInit } from "@angular/core";
import { BillingService }                   from "../../../services/billing.service";

declare const braintree: any;


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-billing-settings",
    templateUrl: "billing.settings.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalBillingSettingsComponent implements AfterViewInit {

    constructor (
        @Inject(BillingService) private billing: BillingService,
    ) {}

    public ngAfterViewInit () {

        this.billing.getBraintreeClientToken()
            .then(token => {
                braintree.setup(token, "dropin", {
                    container: "dropin-container",
                });
            })
            .catch(err => console.log(err));
    }
}
