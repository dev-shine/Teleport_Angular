import { OnInit, OnDestroy } from "@angular/core";
import { IAlert } from "../../../models/interfaces";
import { AlertsService } from "../../../services/alerts.service";
import { ModalService } from "../../../services/modal.service";
export declare class TeleportDevPortalProfileAlertsComponent implements OnInit, OnDestroy {
    private alerts;
    private modal;
    private _subscription;
    private _alerts;
    private _isBusy;
    constructor(alerts: AlertsService, modal: ModalService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly Alerts: IAlert[];
    readonly isBusy: boolean;
    refresh(): void;
    onDelete(alert: IAlert): void;
}
