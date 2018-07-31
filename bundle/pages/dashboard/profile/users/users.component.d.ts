import { OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IUser } from "teleport-module-services/services/v1/models/User";
import { UserService } from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";
export declare class TeleportDevPortalUsersComponent implements OnInit, OnDestroy {
    private users;
    private messages;
    private store$;
    isBusy: boolean;
    private _developer;
    private _users;
    constructor(users: UserService, messages: MessageService, store$: Store<TeleportCoreState>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly Users: IUser[];
    isEditable(user: IUser): boolean;
    resendInvite(user: IUser): void;
}
