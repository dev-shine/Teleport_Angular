import { OnInit, OnDestroy } from "@angular/core";
import "rxjs/add/operator/skipWhile";
import { TopUpService } from "../../../services/top-up.service";
import { MessageService } from "../../../services/message.service";
import { ITopUp } from "../../../models/interfaces";
import { TeleportLoaderService } from "teleport-module-loader";
export declare class TeleportDevPortalTopUpComponent implements OnInit, OnDestroy {
    private topUp;
    private messages;
    private loader;
    TopUp: ITopUp;
    isEditTopUp: boolean;
    private _topup;
    private _subscription;
    constructor(topUp: TopUpService, messages: MessageService, loader: TeleportLoaderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onStartEditMode(): void;
    validateAmount(): string | null;
    validateThreshold(): string | null;
    validateMaxDaily(): string | null;
    onCancel(): void;
    onDeactivate(): void;
    onSubmit(): void;
}
