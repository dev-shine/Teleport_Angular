import { Component, Inject, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { IPayment }                        from "../../../models/interfaces";
import { BillingService, IBillingPayload } from "../../../services/billing.service";
import { TeleportLoaderService } from "teleport-module-loader";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-billing",
    templateUrl: "billing.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalBillingComponent implements OnInit, OnDestroy {

    public view = {
        historyFrom: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        historyTo: new Date(),
        isPaymentFormOpen: false,
    };
    
    private _subscription: Subscription;

    private _balance: number;
    private _payments: IPayment[];


    constructor (
        @Inject(BillingService) private billing: BillingService,
        @Inject(TeleportLoaderService) private loader: TeleportLoaderService,
    ) {}


    public ngOnInit () {

        this.loader.show("Loading payment history...");
        
        this._subscription = this.billing.Observable
            .subscribe((b: IBillingPayload) => {
                this.loader.hide();
                this._balance = b.balance !== undefined ? b.balance : this._balance;
                this._payments = b.payments || this._payments;
                if (b.dateRange) {
                    this.view.historyFrom = b.dateRange.from;
                    this.view.historyTo = b.dateRange.to;
                }
            });
    }


    public ngOnDestroy () {
        if (this._subscription) {
            this._subscription.unsubscribe();
            delete this._subscription;
        }
        delete this._balance;
        delete this._payments;
    }


    public get historyTo (): string {
        return this.view.historyTo.toISOString().substr(0, 10);
    }


    public set historyTo (v: string) {
        this.view.historyTo = new Date(v);
    }


    public get historyFrom (): string {
        return this.view.historyFrom.toISOString().substr(0, 10);
    }


    public set historyFrom (v: string) {
        this.view.historyFrom = new Date(v);
    }


    public get balance (): number {
        return this._balance;
    }


    public get Payments (): IPayment[] {
        return this._payments;
    }


    public async reloadPaymentHistory () {
        this.loader.show("Reloading payment history...");
        await this.billing.refreshPayments(this.view.historyFrom.getTime(), this.view.historyTo.getTime());
    }
}
