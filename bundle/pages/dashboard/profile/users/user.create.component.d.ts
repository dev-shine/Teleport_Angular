import { OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IUser } from "teleport-module-services/services/v1/models/User";
import { UserService } from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";
export declare class TeleportDevPortalUserCreateComponent implements OnInit, OnDestroy {
    private router;
    private users;
    private messages;
    private store$;
    isBusy: boolean;
    isSendInvite: boolean;
    User: IUser;
    private _developer;
    constructor(router: Router, users: UserService, messages: MessageService, store$: Store<TeleportCoreState>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isEmailValid(): boolean;
    isUserValid(): boolean;
    onSubmit(): void;
}
