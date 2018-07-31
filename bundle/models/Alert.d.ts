import { IAlert, IAlertAccountBalance } from "./interfaces";
export declare class Alert implements IAlert {
    private _id;
    private _firstname;
    private _lastname;
    private _email;
    private _phone_no;
    private _send_receipt_on_payment;
    private _notify_on_app_payment;
    private _account_balance;
    constructor(alert: IAlert);
    readonly id: number;
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly phone_no: string;
    readonly send_receipt_on_payment: boolean;
    readonly notify_on_app_payment: boolean;
    readonly account_balance: AlertAccountBalance;
    toJSON(): IAlert;
}
export declare class AlertAccountBalance implements IAlertAccountBalance {
    private _minutes_before_zero;
    private _thresholds;
    constructor(balance?: IAlertAccountBalance);
    readonly minutes_before_zero: number;
    readonly thresholds: number[];
    toJSON(): IAlertAccountBalance;
}
