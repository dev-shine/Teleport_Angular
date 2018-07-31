import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IPayment } from "../models/interfaces";
import { MessageService } from "./message.service";
export interface IBillingPayload {
    balance?: number;
    payments?: IPayment[];
    dateRange?: {
        from: Date;
        to: Date;
    };
}
export declare class BillingService {
    private http;
    private message;
    private store$;
    private _developer;
    private _observable;
    private _observer;
    private _paymentsFrom;
    private _paymentsTo;
    private _lastRefresh;
    private _billingPayload;
    constructor(http: Http, message: MessageService, store$: Store<TeleportCoreState>);
    cleanup(): void;
    readonly Observable: Observable<IBillingPayload>;
    refresh(): Promise<IBillingPayload>;
    refreshPayments(from?: number, to?: number): Promise<IPayment[]>;
    refreshBalance(): Promise<number>;
    getBraintreeClientToken(): Promise<string>;
    makePayment(amount: number, nonce: string, method: string, card_type?: string, last_four?: string): Promise<any>;
}
