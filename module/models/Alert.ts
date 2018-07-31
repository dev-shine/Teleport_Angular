
import { IAlert, IAlertAccountBalance } from "./interfaces";


export class Alert implements IAlert {

    private _id: number;
    private _firstname: string;
    private _lastname: string;
    private _email: string;
    private _phone_no: string | undefined;
    private _send_receipt_on_payment: boolean;
    private _notify_on_app_payment: boolean;
    private _account_balance: AlertAccountBalance;

    constructor(alert: IAlert) {
        this._id                      = alert.id;
        this._firstname               = alert.firstname;
        this._lastname                = alert.lastname;
        this._email                   = alert.email;
        this._phone_no                = alert.phone_no;
        this._send_receipt_on_payment = alert.send_receipt_on_payment;
        this._notify_on_app_payment   = alert.notify_on_app_payment;
        this._account_balance         = new AlertAccountBalance(alert.account_balance);
    }

    public get id () {
        return this._id;
    }

    public get firstname () {
        return this._firstname;
    }

    public get lastname () {
        return this._lastname;
    }

    public get email () {
        return this._email;
    }

    public get phone_no () {
        return this._phone_no;
    }

    public get send_receipt_on_payment () {
        return this._send_receipt_on_payment;
    }

    public get notify_on_app_payment () {
        return this._notify_on_app_payment;
    }

    public get account_balance () {
        return this._account_balance;
    }

    public toJSON (): IAlert {

        return {
            id                      : this.id,
            firstname               : this.firstname,
            lastname                : this.lastname,
            email                   : this.email,
            phone_no                : this.phone_no,
            send_receipt_on_payment : this.send_receipt_on_payment,
            notify_on_app_payment   : this.notify_on_app_payment,
            account_balance         : this.account_balance.toJSON(),
        };
    }
}


export class AlertAccountBalance implements IAlertAccountBalance {

    private _minutes_before_zero: number | undefined;
    private _thresholds: number[] | undefined;

    constructor(balance?: IAlertAccountBalance) {
        if (balance !== undefined) {
            this._minutes_before_zero = balance.minutes_before_zero;
            this._thresholds = balance.thresholds;
        }
    }

    public get minutes_before_zero () {
        return this._minutes_before_zero;
    }

    public get thresholds () {
        return this._thresholds;
    }

    public toJSON (): IAlertAccountBalance {
        return {
            minutes_before_zero : this.minutes_before_zero,
            thresholds          : this.thresholds,
        };
    }
}
