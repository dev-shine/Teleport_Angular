import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IAlert } from "../../../models/interfaces";
import { AlertsService } from "../../../services/alerts.service";
export declare class TeleportDevPortalProfileAlertsCreateComponent implements OnInit {
    private router;
    private alerts;
    Alert: IAlert & any;
    is: {
        MinToZero: boolean;
        Threshold1: boolean;
        Threshold2: boolean;
        Threshold3: boolean;
    };
    private _isBusy;
    constructor(router: Router, alerts: AlertsService);
    ngOnInit(): void;
    readonly isBusy: boolean;
    isMinToZeroValid(): boolean;
    isThresholdValid(v: number): boolean;
    isFormValid(): boolean;
    onSubmit(): void;
}
