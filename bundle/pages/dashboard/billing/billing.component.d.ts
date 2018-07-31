import { OnInit, OnDestroy } from "@angular/core";
import { IPayment } from "../../../models/interfaces";
import { BillingService } from "../../../services/billing.service";
import { TeleportLoaderService } from "teleport-module-loader";
export declare class TeleportDevPortalBillingComponent implements OnInit, OnDestroy {
    private billing;
    private loader;
    view: {
        historyFrom: Date;
        historyTo: Date;
        isPaymentFormOpen: boolean;
    };
    private _subscription;
    private _balance;
    private _payments;
    constructor(billing: BillingService, loader: TeleportLoaderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    historyTo: string;
    historyFrom: string;
    readonly balance: number;
    readonly Payments: IPayment[];
    reloadPaymentHistory(): Promise<void>;
}
