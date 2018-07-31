import { AfterViewInit } from "@angular/core";
import { BillingService } from "../../../services/billing.service";
export declare class TeleportDevPortalBillingSettingsComponent implements AfterViewInit {
    private billing;
    constructor(billing: BillingService);
    ngAfterViewInit(): void;
}
