import { Component, Inject, OnInit } from "@angular/core";
import { Router }                    from "@angular/router";

import { IAlert }        from "../../../models/interfaces";
import { AlertsService } from "../../../services/alerts.service";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-alerts-create",
    templateUrl: "profile.alerts.create.html",
})
export class TeleportDevPortalProfileAlertsCreateComponent implements OnInit {

    public Alert: IAlert & any = null;

    public is = {
        MinToZero: true,
        Threshold1: true,
        Threshold2: false,
        Threshold3: false,
    };

    private _isBusy = false;

    constructor (
        @Inject(Router)        private router: Router,
        @Inject(AlertsService) private alerts: AlertsService,
    ) {}

    public ngOnInit () {

        this._isBusy = false;

        this.Alert = {
            id                     : 0,
            firstname              : "",
            lastname               : "",
            email                  : "",
            phone_no               : "",
            send_receipt_on_payment: false,
            notify_on_app_payment  : false,
            account_balance: {
                minutes_before_zero: 30,
                thresholds         : [],
                threshold1         : 10,
                threshold2         : 100,
                threshold3         : 1000,
            },
        };
    }

    public get isBusy () {
        return this._isBusy;
    }

    public isMinToZeroValid () {
        if (this.is.MinToZero) {
            return this.Alert.account_balance.minutes_before_zero >= 10 && this.Alert.account_balance.minutes_before_zero <= 1440;
        }
        return true;
    }
    
    public isThresholdValid (v: number) {
        if ((this.is as any)[`Threshold${v}`]) {
            let val = this.Alert.account_balance[`threshold${v}`];
            return !! val && val >= 10 && val <= 10000;
        }
        return true;
    }
    
    public isFormValid () {
        return (
                +(this.Alert.send_receipt_on_payment) +
                +(this.is.Threshold1 && this.isThresholdValid(1)) +
                +(this.is.Threshold2 && this.isThresholdValid(2)) +
                +(this.is.Threshold3 && this.isThresholdValid(3)) +
                +(this.is.MinToZero && this.isMinToZeroValid())
            ) > 0;
    }

    public onSubmit () {

        this._isBusy = true;

        this.Alert.account_balance.minutes_before_zero = this.is.MinToZero ? this.Alert.account_balance.minutes_before_zero : undefined;
        this.Alert.account_balance.thresholds = [
            this.is.Threshold1 ? this.Alert.account_balance.threshold1 : undefined,
            this.is.Threshold2 ? this.Alert.account_balance.threshold2 : undefined,
            this.is.Threshold3 ? this.Alert.account_balance.threshold3 : undefined,
        ].filter(t => !! +t);

        this.alerts.add(this.Alert)
            .then(() => this.router.navigate(["/v1/account/alerts"]))
            .catch(() => this._isBusy = false);
    }
}
