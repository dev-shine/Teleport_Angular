import { AfterViewInit, OnDestroy } from "@angular/core";
import "rxjs/add/operator/first";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IUserBasicAuth } from "teleport-module-services/services/v1/models/User";
import { MessageService } from "../../../services/message.service";
import { ModalService } from "../../../services/modal.service";
import { AccountCredentialsService } from "../../../services/account.credentials.service";
export declare class TeleportDevPortalProfileBasicAuthComponent implements AfterViewInit, OnDestroy {
    private modal;
    private messages;
    private creds;
    private store$;
    private dispatcher;
    isBusy: boolean;
    Credentials: IUserBasicAuth[];
    private _userId;
    constructor(modal: ModalService, messages: MessageService, creds: AccountCredentialsService, store$: Store<TeleportCoreState>, dispatcher: ReducerManagerDispatcher);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    create(): void;
    remove(cred: IUserBasicAuth): void;
    apiKeyInputFocus(event: FocusEvent): void;
    apiKeyInputBlur(event: FocusEvent): void;
}
